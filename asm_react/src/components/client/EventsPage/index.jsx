import React from "react";

const events = [
  {
    title: "Dolorum optio tempore voluptas dignissimos",
    date: "December 12",
    author: "John Doe",
    category: "Politics",
    image: "https://cafefcdn.com/203337114487263232/2020/10/12/photo-1-1602466899550214513873.jpg",
  },
  {
    title: "Nisi magni odit consequatur autem nulla dolorem",
    date: "March 19",
    author: "Julia Parker",
    category: "Economics",
    image: "https://image.bnews.vn/MediaUpload/Org/2020/10/29/winner-x-bike-sport.jpg",
  },
  {
    title: "Possimus soluta ut id suscipit ea ut",
    date: "June 24",
    author: "Maria Doe",
    category: "Sports",
    image: "https://imgcdn.tapchicongthuong.vn/cartime-media/21/10/26/xe_honda.jpg",
  },
  {
    title: "Non rem rerum nam cum quo minus",
    date: "August 05",
    author: "Maria Doe",
    category: "Sports",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mdKrHuoL41QovZfrea2smqaBRprS7VYQNg&s",
  },
  {
    title: "Accusamus quaerat aliquam qui debitis facilis",
    date: "September 17",
    author: "John Parker",
    category: "Politics",
    image: "https://imgcdn.tapchicongthuong.vn/cartime-media/21/10/26/xe_honda.jpg",
  },
  {
    title: "Distinctio provident quibusdam numquam aperiam",
    date: "December 07",
    author: "Julia White",
    category: "Economics",
    image: "https://image.bnews.vn/MediaUpload/Org/2020/10/29/winner-x-bike-sport.jpg",
  },
];

const EventsPage = () => {
  return (
    <main className="container mx-auto py-10 px-4 mt-5">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="text-sm text-gray-500">{event.date}</span>
              <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
              <div className="text-sm text-gray-600 mt-1">
                <span>{event.author}</span> / <span>{event.category}</span>
              </div>
              <a href="#" className="text-blue-600 mt-3 block hover:underline">Read More</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default EventsPage;