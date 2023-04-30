// GETTING STARTED WITH MONGODB & CRUD Operations

// The MongoDB module exports MongoClient, and that’s what we’ll use to connect to a MongoDB database. 
// We can use an instance of MongoClient to connect to a cluster, access the database in that cluster, and 
// close the connection to that cluster.

const {MongoClient} = require('mongodb'); 

// Let’s create an asynchronous function named main() where we will connect to our MongoDB cluster, 
// call functions that query our database, and disconnect from our cluster.

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */

    // The first thing we need to do inside of main() is create a constant for our connection URI. The connection URI 
    // is the connection string you copied in Atlas in the previous section. When you paste the connection string, 
    // don't forget to update <username> and <password> to be the credentials for the user you created in the previous 
    // section. The connection string includes a <dbname> placeholder. For these examples, we'll be using the 
    // sample_airbnb database, so replace <dbname> with sample_airbnb.
    const uri = "mongodb+srv://cse341projects:hove101cse341@cluster0.xptqsz6.mongodb.net/?retryWrites=true&w=majority";
 
    // Now that we have our URI, we can create an instance of MongoClient.
    const client = new MongoClient(uri);
    
    // Let’s wrap our calls to functions that interact with the database in a try/catch statement so that we 
    // handle any unexpected errors.
    try {
        // Connect to the MongoDB cluster
        // Now we're ready to use MongoClient to connect to our cluster. client.connect() will return a promise. 
        // We will use the await keyword when we call client.connect() to indicate that we should block further 
        // execution until that operation has completed.
        await client.connect();
 
        // Make the appropriate DB call - check if we're connected to our database.
        // await listDatabases(client);
        
        // CRUD calls - Create
        // 1. Create a new listing as an object
        // await createListing(client, {
        //     name: "Lovely Loft",
        //     summary: "A charming loft in Paris",
        //     bedroom: 1,
        //     bathroon: 1
        // })

        // 1.1. Create new multiple listings as objects
        // await createMultipleListings (client, [
        //     {
        //         name: "Infinite Views",
        //         summary: "Modern home with infinite views from the infinite pool",
        //         property_type: "House",
        //         bedrooms: 5,
        //         bathrooms: 4.5,
        //         beds: 5
        //     },
        //     {
        //         name: "Beautiful Beach House",
        //         summary: "Enjoy relaxed beach living in this house with a private beach",
        //         bedrooms: 4,
        //         bathroons: 2.5,
        //         beds: 7,
        //         last_review: new Date()
        //     },
        //     {
        //         name: "Private room in London",
        //         property_type: "House",
        //         bedrooms: 1,
        //         bathroons: 1
        //     }
        // ]);
        
        // 1. CRUD Calls - Read (querry one specific document)
        // await findOneListingByName (client, "Infinite Views");

        // 1.1 CRUD Calls - Read (querry multiple documents)
        // await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
        //     minimumNumberOfBedrooms: 4,
        //     minimumNumberOfBathrooms: 2,
        //     maximumNumberOfResults: 5
        // });
        
        // 1. CRUD calls - Update one document (option 1)
        // await updateListingByName(client, "Infinite Views", { bedrooms: 6, beds: 8 });

        // 1. CRUD calls - Upset one document (option 2)
        // await upsertListingByName(client, "Cozy Cottage", { name: "Cozy Cottage", bedrooms: 2, bathrooms: 1 });

        // 1.1. CRUD calls - update multiple documents
        // await updateAllListingsToHavePropertyType(client);

        // 1. CRUD calls - Delete one document
        // await deleteListingByName(client, "Cozy Cottage");

        // 1.1. CRUD calls - Delete many documents
        await deleteListingsScrapedBeforeDate(client, new Date("2019-02-15"));

    } catch (e) {
        console.error(e);

    // We want to be sure we close the connection to our cluster, so we’ll end our try/catch with a finally statement.   
    } finally {
        await client.close();
    }
}

// Once we have our main() function written, we need to call it. Let’s send the errors to the console.
main().catch(console.error);

// CRUD OPERATIONS
// CREATE
// 1. Create a document
async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`)
}

// 1.1. Create multiple documents
async function createMultipleListings(client, newListings) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);

    console.log(`${result.insertCount} new listing created with the following id(s):`);
    console.log(result.insertedIds)
}

// READ 
// 1. Find 1 listing by name
async function findOneListingByName (client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });
    // NB if more than one document matches the querry, only one document is returned (findOne)
    // NB findOne requires a parameter of type object for the querry (from zero to multiple objects)
    //  NB an empty object will querry all documents in a collection

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
 }

// 1.1 Find multiple listings based on minimum bedrooms, bathrooms and most recent reviews
 async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    // destructure the parameters and set default values
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find( // Use find to querry multiple docs
                            {
                                bedrooms: { $gte: minimumNumberOfBedrooms }, // $gte = greater than or equal to
                                bathrooms: { $gte: minimumNumberOfBathrooms }
                            }
                            ).sort({ last_review: -1 }) // Sort the results (cursor by descending order of reviews)
                            .limit(maximumNumberOfResults); // Limit the number of results 

    const results = await cursor.toArray(); // retrieve the limited results in an array

    if (results.length > 0) { // Printing a summary of each listing
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
        results.forEach((result, i) => {
            date = new Date(result.last_review).toDateString();

            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
    }
}

// UPDATE
// 1. Update one document (Option 1 - use updateOne)
async function updateListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .updateOne({ name: nameOfListing }, { $set: updatedListing });
                                    // filter                 // update operation

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

// 1. Upset one document (Option 2 - use upsetOne) Upset checks if the document exists, if it does, it update if not it inserts it.
async function upsertListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .updateOne({ name: nameOfListing }, 
                                   { $set: updatedListing }, 
                                   { upsert: true });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);

    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
}

// 1.1. Update multiple documents
async function updateAllListingsToHavePropertyType(client) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .updateMany({ property_type: { $exists: false } }, 
                                    { $set: { property_type: "Unknown" } });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

// DELETE
// 1. Deleting one document by name
async function deleteListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
            .deleteOne({ name: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

// 1.1. Delete multiple documents
async function deleteListingsScrapedBeforeDate(client, date) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .deleteMany({ "last_scraped": { $lt: date } });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

// LIST DATABASES IN A CLUSTER
// List the databases in our cluster
// In the previous section, we referenced the listDatabases() function. Let’s implement it!
// This function will retrieve a list of databases in our cluster and print the results in the console.

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`);
    })
}

// SAVE THE FILE

// Execute Your Node.js Script by running this command in the terminal: node demo.js