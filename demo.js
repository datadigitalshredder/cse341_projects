// The MongoDB module exports MongoClient, and that’s what we’ll use to connect to a MongoDB database. 
// We can use an instance of MongoClient to connect to a cluster, access the database in that cluster, and 
// close the connection to that cluster.

const {MongoClient} = require('mongodb'); 

// Let’s create an asynchronous function named main() where we will connect to our MongoDB cluster, 
// call functions that query our database, and disconnect from our cluster.

async function main(){
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
    // mongodb+srv://<username>:<password>@cluster0.gliv6an.mongodb.net/?retryWrites=true&w=majority
 
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
 
        // Make the appropriate DB calls
        await listDatabases(client);
 
    } catch (e) {
        console.error(e);

    // We want to be sure we close the connection to our cluster, so we’ll end our try/catch with a finally statement.   
    } finally {
        await client.close();
    }
}

// Once we have our main() function written, we need to call it. Let’s send the errors to the console.
main().catch(console.error);

// List the databases in our cluster
// In the previous section, we referenced the listDatabases() function. Let’s implement it!
// This function will retrieve a list of databases in our cluster and print the results in the console.

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`);
        });

}

// SAVE THE FILE

// Execute Your Node.js Script by running this command in the terminal: node connection.js