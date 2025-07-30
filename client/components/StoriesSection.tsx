import { Link } from "react-router-dom";

interface Story {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  image: string;
  date: string;
  collectionRoute: string;
}

const stories: Story[] = [
  {
    id: "1",
    title: "The Art of Emerald Cutting",
    excerpt: "Discover the ancient techniques behind our emerald mastery",
    description:
      "Our master craftsmen have perfected the art of emerald cutting over generations, ensuring each stone captures light in the most magnificent way.",
    date: "January 2025",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-story.jpg?width=400",
    collectionRoute: "/collections/emerald",
  },
  {
    id: "2",
    title: "Ruby: The Stone of Kings",
    excerpt: "Explore the royal heritage of our ruby collection",
    description:
      "From ancient royalty to modern elegance, rubies have always symbolized power and passion. Our collection honors this rich legacy.",
    date: "December 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-story.jpg?width=400",
    collectionRoute: "/collections/ruby",
  },
  {
    id: "3",
    title: "Sapphire Legends",
    excerpt: "The wisdom and mystery behind sapphire craftsmanship",
    description:
      "Each sapphire in our collection tells a story of wisdom and divine favor, carefully selected and crafted to perfection.",
    date: "November 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-story.jpg?width=400",
    collectionRoute: "/collections/sapphire",
  },
  {
    id: "4",
    title: "Pearl Perfection",
    excerpt: "The journey from ocean depths to timeless elegance",
    description:
      "Our pearl collection represents the perfect harmony between nature's gifts and human artistry, creating pieces of eternal beauty.",
    date: "October 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-story.jpg?width=400",
    collectionRoute: "/collections/pearl",
  },
  {
    id: "5",
    title: "Celestial Inspirations",
    excerpt: "How the cosmos influences our design philosophy",
    description:
      "Drawing inspiration from the stars and planets, our celestial collection brings the magic of the universe to your jewelry box.",
    date: "September 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/celestial-story.jpg?width=400",
    collectionRoute: "/collections/celestial",
  },
];

export default function StoriesSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">OUR STORIES</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Link
              key={story.id}
              to={story.collectionRoute}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group hover:transform hover:-translate-y-1"
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{story.date}</div>
                <h3 className="font-bold text-xl mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {story.title}
                </h3>
                <p className="text-gray-600 mb-4 font-medium">
                  {story.excerpt}
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  {story.description}
                </p>
                <span className="inline-block text-black font-medium group-hover:text-gray-600 transition duration-300">
                  Explore Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/collections"
            className="bg-black text-white px-8 py-3 font-bold hover:bg-gray-800 transition duration-300"
          >
            VIEW ALL COLLECTIONS
          </Link>
        </div>
      </div>
    </section>
  );
}
