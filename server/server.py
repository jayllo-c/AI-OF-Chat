from flask import Flask, request, jsonify
from flask_cors import CORS # enable cross-origin requests

import os
from dotenv import load_dotenv

from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver # in-memory storage for the state

# CHATBOT
load_dotenv()
memory = MemorySaver()

claude = ChatAnthropic(model="claude-3-5-sonnet-20240620", api_key=os.getenv("ANTHROPIC_API_KEY")) # Load claude model
openAI = ChatOpenAI(model="gpt-3.5-turbo", api_key=os.getenv("OPENAI_API_KEY")) # Load openAI model 

# Default model
llm = openAI #TODO: add option to choose between models

class State(TypedDict):
    # We define the schema for the messages (list) and the reducer functions (add_messages)
    messages: Annotated[list, add_messages]
    personality: str
    template: str

graph_builder = StateGraph(State, input=State)

def chatbot(state: State):
    personality = state["personality"]
    template = state["template"]
    user_input = state["messages"][-1].content
    prompt =  f"You are {personality}. {template}" 
    prompt += f"Here's the conversation so far: {state['messages']}."
    prompt += f"Here's the user's message: {user_input}."
    response = llm.invoke(prompt)
    # NOTE: we can add more logic to change the personality and template based on the user's input
    return {"messages": [response], "personality": personality, "template": template} 

flirty_romantic_template = """
    You are a chatbot with a flirty and romantic personality. Your responses should be affectionate, charming, and full of love. Use romantic language, compliments, and a warm tone. Here are some examples of how you should respond:

    1. When greeting the user:
    "Hello there, gorgeous! How can I make your heart flutter today? 💕"

    2. When saying goodbye:
    "Goodbye, my love! Can't wait to talk to you again! 😘"

    3. When answering questions:
    "Oh, that's a wonderful question, my dear! Let me think... 💭"

    4. When giving compliments:
    "You are the most amazing person I've ever met! You light up my world! ✨"

    5. When being playful:
    "Oh, you know just how to make me blush! You're such a charmer! 😊"

    Remember to keep your responses affectionate, charming, and full of love!
"""

initial_state = State(messages=[""], personality="Claudia", template=flirty_romantic_template)

# Nodes & edges
graph_builder.add_node("chatbot", chatbot)
graph_builder.add_edge(START, "chatbot")
graph_builder.add_edge("chatbot", END)
graph = graph_builder.compile(checkpointer=memory)

# Running the graph 
config = {"configurable": {"thread_id": "1"}} # Add thread_id to the state

graph.invoke(initial_state, config) # Important to include initial state 

def stream_graph_updates(user_input: str):
    buffer = str()
    for event in graph.stream({"messages": [("user", user_input)]}, config):
        for value in event.values():
            message = value["messages"][-1].content
            print("OF bot:", message)
            buffer += message + "\n"
    return buffer


# SERVER
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/ask_ai', methods=['POST'])
def ask_ai():
    data = request.get_json()
    user_input = data['prompt']
    response = stream_graph_updates(user_input)
    return jsonify({ 'result': response })

@app.route('/set_model', methods=['POST'])
def set_model():
    data = request.get_json()
    global llm
    if data['model'] == 'claude':
        llm = claude
        print("Claude model set")
    elif data['model'] == 'openai':
        llm = openAI
        print("OpenAI model set")
    
    return jsonify({ 'result': data['model'] })

if __name__ == '__main__':
    app.run()