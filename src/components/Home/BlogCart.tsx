interface BlogCardProps {
  image: string;
  title: string;
  date: string;
  comments: number;
  description: string;
  category: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  date,
  comments,
  description,
  category,
}) => {
  return (
    <div className=" bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-6 flex flex-col flex-grow">
        <div className="bg-orange-500 text-white text-xs font-semibold inline-block py-1 px-4 rounded-full uppercase mb-2">
          {category}
        </div>
        <h2 className="text-xl font-bold mt-2">{title}</h2>
        <div className="text-gray-500 text-sm mt-2 flex items-center space-x-4">
          <span className="flex items-center">
            <svg
              className="h-4 w-4 text-red-500 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.75a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 0 0 0-14.5zm0 13a5.75 5.75 0 1 1 0-11.5 5.75 5.75 0 0 1 0 11.5z" />
              <path d="M12.75 12h-3v1.5h4.5V12H12.75zm0 3h-3v1.5h3.75v-1.5H12.75z" />
            </svg>
            {date}
          </span>
          <span className="flex items-center">
            <svg
              className="h-4 w-4 text-red-500 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8.5 12.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h2zm3 0a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h2zm3 0a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h2z" />
            </svg>
            {comments} Comments
          </span>
        </div>
        <p className="mt-4 text-gray-700 flex-grow">{description}</p>
        <a
          href="#"
          className="text-orange-600 hover:underline font-semibold mt-4 inline-block self-start"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
