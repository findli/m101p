from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.test
animals = db.animals

doc = {'animal': 'monkey'}
print doc

animals.insert(doc)
print doc
del doc['animal']
print doc

doc['animal'] = 'cat'
animals.insert(doc)
del doc['animal']

doc['animal'] = 'lion'
animals.insert(doc)
