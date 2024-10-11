const activities = [
  {
    title: "Expert Coaching",
    description:
      "Receive personalized training from experienced coaches who will help you enhance your skills and achieve your athletic goals.",
    icon: "👨‍🏫",
  },
  {
    title: "Basketball League",
    description:
      "Join our competitive basketball league to showcase your skills, participate in thrilling matches, and be part of an enthusiastic community.",
    icon: "🏀",
  },
  {
    title: "Swimming Sessions",
    description:
      "Take part in swimming sessions with qualified instructors, perfect for fitness, relaxation, and competitive training in our state-of-the-art pool.",
    icon: "🏊‍♂️",
  },
  {
    title: "Tennis Court Rental",
    description:
      "Book our well-maintained tennis courts for casual games or serious matches. Enjoy our top-notch facilities and enhance your game.",
    icon: "🎾",
  },
  {
    title: "Yoga Classes",
    description:
      "Experience the benefits of yoga with our expert-led classes. Improve your flexibility, strength, and mental well-being in a serene environment.",
    icon: "🧘‍♀️",
  },
  {
    title: "CrossFit Training",
    description:
      "Challenge yourself with high-intensity CrossFit workouts designed to improve your strength, endurance, and overall fitness in a supportive community.",
    icon: "🏋️‍♂️",
  },
  {
    title: "Rock Climbing",
    description:
      "Test your climbing skills on our indoor rock walls, designed for climbers of all levels. Enjoy a fun and challenging workout in a safe environment.",
    icon: "🧗‍♂️",
  },
  {
    title: "Soccer Tournaments",
    description:
      "Participate in exciting soccer tournaments and leagues. Show off your skills, compete with other teams, and be part of our vibrant soccer community.",
    icon: "⚽",
  },
];

const Activities = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title and Subtitle */}
        <h2 className="text-4xl font-bold text-orange-600 mb-4">
          Explore Our Activities
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Discover a variety of engaging activities designed to enhance your
          fitness and well-being.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-6 bg-white shadow-lg rounded-lg text-center transition-transform transform hover:scale-105 ${
                index === 1 || index === 6
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                  : ""
              }`}
            >
              <div className="text-6xl mb-4">{activity.icon}</div>
              <h3
                className={`text-2xl font-semibold ${
                  index === 1 || index === 6 ? "text-white" : "text-gray-900"
                }`}
              >
                {activity.title}
              </h3>
              <p
                className={`mt-3 text-lg ${
                  index === 1 || index === 6 ? "text-white" : "text-gray-600"
                }`}
              >
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;


