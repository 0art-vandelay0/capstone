from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
mongodb_url = os.environ.get('MONGODB_URL')

client = MongoClient(mongodb_url)
db = client['Bathroom']
bathrooms_collection = db['Bathrooms']

# Migrate existing documents to new format
cursor = bathrooms_collection.find({})
for doc in cursor:
    new_location = {
        "type": "Point",
        "coordinates": [doc['lng'], doc['lat']]
    }
    bathrooms_collection.update_one(
        {'_id': doc['_id']},
        {'$set': {'location': new_location}, '$unset': {'lat': "", 'lng': 
""}}
    )

# Create a 2dsphere index
bathrooms_collection.create_index([("location", "2dsphere")])

