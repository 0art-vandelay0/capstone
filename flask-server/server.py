
import os
from flask import request
from Twilio import send_sms
from pymongo import MongoClient
from flask_cors import CORS
from flask import Flask, jsonify
from dotenv import load_dotenv
load_dotenv()


# print("Account SID:", os.environ.get("TWILIO_ACCOUNT_SID"))
# print("Auth Token:", os.environ.get("TWILIO_AUTH_TOKEN"))
# print("Twilio SID from server.py:", os.environ.get("TWILIO_ACCOUNT_SID"))


class Database:
    client = None
    # db = None

    @classmethod
    def connect(cls):
        mongodb_url = os.environ.get('MONGODB_URL')
        print(os.environ.get('MONGODB_URL'))
        if cls.client is None:
            cls.client = MongoClient(mongodb_url)
            cls.db = cls.client['Bathroom']


app = Flask(__name__)
CORS(app)
Database.connect()


@app.route('/bathrooms', methods=['GET'])
def bathrooms():
    try:
        bathrooms_collection = Database.db['Bathrooms']
        bathrooms = list(bathrooms_collection.find())
        print("Bathrooms fetched:", bathrooms)  # Debug print
        for bathroom in bathrooms:
            bathroom["_id"] = str(bathroom["_id"])
        return jsonify({"bathrooms": bathrooms})
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500


@app.route('/send_sms', methods=['POST'])
def send_sms_route():
    try:
        # Fetch body and to from the request payload
        body = request.json.get('body')
        to = request.json.get('to')

        # Fetch from_ from environment variables
        from_ = os.environ.get("TWILIO_PHONE")

        print(f"Body: {body}, To: {to}, From: {from_}")  # Debugging line

        message_sid = send_sms(body, to, from_)
        print(f"Message SID: {message_sid}")  # Debugging line

        return jsonify({"success": True, "message_sid": message_sid})
    except Exception as e:
        print(f"An error occurred: {e}")  # Debugging line
        return jsonify({"error": "An error occurred"}), 500


if __name__ == "__main__":
    app.run(debug=True)
