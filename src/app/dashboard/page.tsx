'use client';

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Kaushan_Script } from "next/font/google";

const kaushan = Kaushan_Script({ subsets: ["latin"], weight: "400" });

interface Product {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  sold: number;
  category: "Painting" | "Drawing";
}

const products: Product[] = [
  { name: "Acrylic Paint Set (18 colors)", price: 450, originalPrice: 699, image: "/acrylicpaint.jpg", rating: 5, sold: 320, category: "Painting" },
  { name: "Watercolor Brush Set", price: 180, image: "/watercolorbrush.jpg", rating: 4, sold: 210, category: "Painting" },
  { name: "Canvas Board 12x16", price: 160, originalPrice: 220, image: "/canvas.jpg", rating: 4.8, sold: 150, category: "Painting" },
  { name: "Mini Canvas (6x6)", price: 60, image: "/canvas.jpg", rating: 4, sold: 120, category: "Painting" },
  { name: "Acrylic Paint Set (12 colors)", price: 450, originalPrice: 699, image: "/acrylic.jpg", rating: 5, sold: 320, category: "Painting" },
  { name: "Paint Brush (18 colors)", price: 199, image: "/paintbrush.jpg", rating: 5, sold: 100, category: "Painting" },
  { name: "Palette Knives (1 Set)", price: 450, image: "/paletteknives.jpg", rating: 5, sold: 240, category: "Painting" },
  { name: "Wooden palette", price: 85, image: "/woodpalette.jpg", rating: 5, sold: 320, category: "Painting" },
  { name: "Water Color", price: 109, image: "/watercolor.jpg", rating: 5, sold: 180, category: "Painting" },

  { name: "Sketch Book", price: 150, image: "/sketchbook.jpg", rating: 4, sold: 560, category: "Drawing" },
  { name: "Color Pen (48 pcs)", price: 400, image: "/colorpen.jpg", rating: 4.5, sold: 410, category: "Drawing" },
  { name: "Artist Graphite Pencils (12 pcs)", price: 150, image: "/graphite.jpg", rating: 4, sold: 350, category: "Drawing" },
  { name: "Oil Pastel (48 Colors)", price: 299, image: "/oilpastel.jpg", rating: 5, sold: 900, category: "Drawing" },
  { name: "Kneaded Eraser", price: 38, image: "/kneadedEraser.jpg", rating: 4, sold: 300, category: "Drawing" },
  { name: "White Charcoal Pencil", price: 75, image: "/whitecharcoalpencil.jpg", rating: 4.2, sold: 250, category: "Drawing" },
  { name: "Blending Stump", price: 40, image: "/blendingStump.jpg", rating: 4.5, sold: 180, category: "Drawing" },
  { name: "Color Pencil", price: 345, image: "/colorpencil.jpg", rating: 4, sold: 560, category: "Drawing" },
  { name: "White Pen (5 pieces)", price: 150, image: "/whitepen.jpg", rating: 4.4, sold: 95, category: "Drawing" },
  { name: "Electric Eraser", price: 130, image: "/electriceraser.jpg", rating: 4.1, sold: 80, category: "Drawing" },
  { name: "Eraser", price: 12, image: "/eraser.jpg", rating: 3, sold: 50, category: "Drawing" },
  { name: "Pencil Set", price: 350, image: "/pencilset.jpg", rating: 4, sold: 55, category: "Drawing" },
  { name: "High Lighter (1 piece)", price: 48, image: "/sketchbook.jpg", rating: 4.5, sold: 200, category: "Drawing" },
  { name: "Vellum Board", price: 48, image: "/vellum.jpg", rating: 4, sold: 150, category: "Drawing" },
];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Painting" | "Drawing">("All");
  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    // Generate bubbles only on client
    const newBubbles = [...Array(25)].map(() => ({
      size: Math.random() * 40 + 20,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: Math.random() * 20 + 15,
      opacity: Math.random() * 0.3 + 0.2,
      color: `rgba(${200 + Math.random() * 55}, ${150 + Math.random() * 100}, 255, ${Math.random() * 0.3 + 0.2})`,
    }));
    setBubbles(newBubbles);
  }, []);

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  function handleAddToCart(product: Product) {
    alert(`Added "${product.name}" to cart!`);
  }

  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 font-sans overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
        {bubbles.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full shadow-xl"
            style={{
              width: b.size,
              height: b.size,
              left: `${b.left}%`,
              bottom: `-50px`,
              background: b.color,
              filter: "blur(8px)",
              animation: `floatBubble ${b.duration}s ease-in-out ${b.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="flex gap-3 mb-6 justify-center relative z-10">
        {["All", "Painting", "Drawing"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as any)}
            className={`px-4 py-2 rounded-full border transition font-medium text-sm md:text-base ${
              selectedCategory === cat
                ? "bg-purple-700 text-white border-purple-700 shadow-lg animate-bounce"
                : "bg-purple-200 text-purple-900 hover:bg-purple-400 hover:text-white border-purple-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
        {filtered.map((item, index) => (
          <div
            key={index}
            className="relative border rounded-xl bg-purple-100/60 shadow-md transition p-2 cursor-pointer hover:shadow-2xl hover:-translate-y-1 hover:scale-105 duration-300 group"
          >
            <div className="relative rounded-xl overflow-hidden">

              <div className="w-full h-40 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-purple-200 shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <button
                onClick={() => handleAddToCart(item)}
                className="absolute bottom-2 right-2 bg-purple-700 text-white text-xs px-3 py-1 rounded-lg transition duration-300 hover:bg-purple-800 opacity-0 group-hover:opacity-100"
              >
                Add to Cart
              </button>
            </div>

            <div className="mt-3 p-3 bg-white/30 rounded-lg backdrop-blur-sm transition hover:bg-white/50 duration-300">
              <p className={`${kaushan.className} text-sm md:text-base font-medium line-clamp-2 text-purple-900`}>
                {item.name}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-purple-900 font-bold text-base md:text-lg animate-pulse">
                  ₱{item.price}
                </span>
                {item.originalPrice && (
                  <span className="text-gray-500 text-xs line-through">
                    ₱{item.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center text-xs text-gray-700 mt-2">
                <Star size={14} fill="gold" stroke="gold" />
                <span className="ml-1">{item.rating}</span>
                <span className="ml-2">| Sold {item.sold}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes floatBubble {
          0% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-50vh) scale(1.1); opacity: 0.7; }
          100% { transform: translateY(-120vh) scale(0.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
