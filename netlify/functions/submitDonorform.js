const { MongoClient } = require("mongodb");

exports.handler = async (event) => {
  const uri = process.env.MONGODB_URI; // Use environment variable
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db("test");

    // Parse form data from the event object
    const formData = JSON.parse(event.body);

    // Determine the collection based on the form type
    const collectionName = event.body.includes("packets") ? "patients" : "donors";
    const collection = database.collection(collectionName);

    // Insert form data into MongoDB
    const result = await collection.insertOne(formData);

    // If it's a patient form, fetch donor data based on the submitted blood group
    if (collectionName === "patients") {
      const bloodGroup = formData.bloodGroup;

      // Fetch donor data based on blood group with specific fields (name, phone, bloodGroup)
      const donorCollection = database.collection("donors");
      const donorData = await donorCollection
        .find({ bloodGroup })
        .project({ _id: 0, name: 1, phone: 1, bloodGroup: 1 })
        .toArray();

      // Include donor data in the response
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Form submitted successfully",
          result,
          donorData,
        }),
      };
    }

    // If it's a donor form, simply respond with the success message
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submitted successfully", result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Form submission failed", error: error.message }),
    };
  } finally {
    await client.close();
  }
};
