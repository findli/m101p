mongorestore --drop -d enron -c messages /home/dloreto/dump/enron/messages.bson
////////////////////////////////////////////// Q1
db.messages.find({
	"headers.From" : "andrew.fastow@enron.com",
	"headers.To" : "jeff.skilling@enron.com"
}).count()
////////////////////////////////////////////// Q2
db.messages.aggregate([
{
	$project: {
		id: "$_is",
		from: "$headers.From",
		to: "$headers.To"
	}
},
{
	$unwind: "$to"
},
{ 
	$group : {
    	_id : {id: "$_id", from :"$from", to:"$to"}
    }    
},
{
	$group: {
		_id : {from: "$_id.from", to :"$_id.to"},
		count: {$sum: 1}
	}
},
{
	$sort: { count: -1}
},
{
	$limit: 1
}]);
////////////////////////////////////////////// Q3
db.messages.update(
	{"headers.Message-ID": "<8147308.1075851042335.JavaMail.evans@thyme>" },
	{$push: {"headers.To": "mrpotatohead@10gen.com"}}
	);
////////////////////////////////////////////// Q4
mongoimport --drop -d blog -c posts posts.json
self.posts.update({"permalink": permalink}, {"$inc": {"comments.%s.num_likes" % comment_ordinal: 1}})
////////////////////////////////////////////// Q5
a_1_b_1
a_1_c_1
c_1
a_1_b_1_c_-1
////////////////////////////////////////////// Q6
Set w=0, j=0 on writes
Remove all indexes from the collection
Build a replica set and insert data into the secondary nodes to free up the primary nodes.
////////////////////////////////////////////// Q7
mongoimport --drop -d pics -c albums albums.json
mongoimport --drop -d pics -c images images.json
20,278
see q7.py
////////////////////////////////////////////// Q8
1
////////////////////////////////////////////// Q9
patient_id
////////////////////////////////////////////// Q10
The query did not utilize an index to figure out which documents match the find criteria.
The query used an index for the sorting phase.
The query performed a full collection scan

