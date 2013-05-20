from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.pics
albums = db.albums
result = albums.aggregate(
    [{"$project": {"images": 1, "_id": 0}}, {"$unwind": "$images"}, {"$group": {"_id": "$images"}}])
images_list = [img["_id"] for img in result["result"]]
print "number of images in albums: " + str(len(images_list))
images = db.images
print "old number of images with kittens tag: " + str(images.find({"tags": "kittens"}).count())
images.remove({"_id": {"$nin": images_list}})
print "number of images in images: " + str(images.count())
print "new number of images with kittens tag: " + str(images.find({"tags": "kittens"}).count())

