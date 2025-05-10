import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router";

const GET_Posts = gql`
  query GetPosts {
    posts {
      title
      author {
        name
        id
      }
    }
  }
`;

const Posts = () => {
  const { loading, error, data } = useQuery(GET_Posts);
  console.log(data);

  return (
    <div className="relative flex flex-col items-center h-screen bg-black text-white text-xl px-6 py-10">
      {/* Go Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-sm border border-cyan-500 text-cyan-500 px-4 py-1 rounded-md hover:bg-cyan-500 hover:text-black transition duration-300"
      >
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-semibold mb-6">This is Posts component</h1>

      {loading && <p className="text-neutral-400">Loading...</p>}
      {error && <p className="text-red-400">Error: {error.message}</p>}

      <div className="flex flex-row flex-wrap justify-center gap-6 mt-6">
        {data?.posts?.map((post) => (
          <div
            key={post.id}
            className="flex flex-col justify-between bg-neutral-900 border border-neutral-700 rounded-2xl p-6 w-full max-w-sm shadow-sm hover:shadow-cyan-500/30 transition duration-300 cursor-pointer"
          >
            <h2 className="text-white text-lg font-medium mb-4">
              {post.title}
            </h2>
            <p className="text-neutral-400 text-sm text-right">
              By {post.author.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
