import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// export function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: meetups,
//     },
//   };
// }

export async function getStaticProps() {
  const url = "mongodb://localhost:27017";
  const client = await MongoClient.connect(url);

  const dbName = "next-meetups";
  const db = client.db(dbName);

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 60,
  };
}

export default HomePage;
