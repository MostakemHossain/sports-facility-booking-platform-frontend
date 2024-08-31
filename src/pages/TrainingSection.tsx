const TrainingSection = () => {
  return (
    <div className="max-w-7xl mx-auto py-16">
      <div className="flex flex-col gap-10 lg:flex-row items-center justify-between p-8">
        <div className="relative w-full  mb-8 lg:mb-0">
          <img
            src="https://c0.wallpaperflare.com/preview/58/1012/27/football-ball-sports-ground-goal.jpg"
            alt="Facility"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="w-full lg:w-1/2 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold mb-2 flex items-center">
              <span className="text-red-500 mr-3">🏋️‍♂️</span> Strength/Free
              Weights
            </h3>
            <p className="text-gray-700">
              Enhance your strength with our top-of-the-line free weights and
              resistance training equipment.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold mb-2 flex items-center">
              <span className="text-red-500 mr-3">🏋️‍♂️</span> Personal Training
              Services
            </h3>
            <p className="text-gray-700">
              Receive personalized training plans tailored to your fitness goals
              from our certified trainers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold mb-2 flex items-center">
              <span className="text-red-500 mr-3">🏃‍♂️</span> Cardio Workouts
            </h3>
            <p className="text-gray-700">
              Boost your heart health with a variety of cardio machines,
              including treadmills, bikes, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingSection;
