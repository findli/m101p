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
