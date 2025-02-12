"use client";

import { useState, useEffect } from "react";

type Term = { id: string; title: string; description: string };

export default function Home() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("/api/glossary")
      .then((res) => res.json())
      .then(setTerms);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/glossary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      fetch("/api/glossary").then((res) => res.json()).then(setTerms);
      setIsAddModalOpen(false);
    } else {
      alert("This term already exists!");
    }
  };

  const handleDeleteTerm = async (id: string) => {
    if (!confirm("Are you sure you want to delete this term?")) return;
  
    const res = await fetch(`/api/glossary?id=${id}`, {
      method: "DELETE",
    });
  
    if (res.ok) {
      setTerms(terms.filter((term) => term.id !== id));
      setSelectedTerm(null); // Close modal after deletion
    } else {
      alert("Error deleting the term.");
    }
  };
  

  const filteredTerms = selectedLetter
    ? terms.filter((t) => t.title.toUpperCase().startsWith(selectedLetter))
    : terms;

  return (
    <div className="container">
      <h2 className="text-3xl font-bold mb-6 text-center">MA IE Glossary</h2>
      <br />

      {/* Add New Key Term Button */}
      <button className="primary mb-4 w-full" onClick={() => setIsAddModalOpen(true)}>
        Add New Key Term
      </button>

      {/* Alphabet Tabs */}
      <div className="tab-container">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <div
            key={letter}
            className={`tab ${selectedLetter === letter ? "active" : ""}`}
            onClick={() => setSelectedLetter(letter)}
          >
            {letter}
          </div>
        ))}
        <div className="tab secondary" onClick={() => setSelectedLetter(null)}>All</div>
      </div>

      {/* Terms List */}
      <div className="term-list">
        {filteredTerms.length === 0 ? (
          <p className="text-gray-400 text-center">No terms found.</p>
        ) : (
          filteredTerms.map((term) => (
            <button key={term.id} className="term-item" onClick={() => setSelectedTerm(term)}>
              {term.title}
            </button>
          ))
        )}
      </div>

{isAddModalOpen && (
  <div
    className="modal fixed inset-0 flex items-center justify-center"
    onClick={() => setIsAddModalOpen(false)} // Clicking outside closes it
  >
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()} // Clicking inside does NOT close it
    >
      <h2 className="text-xl font-bold mb-4">Add New Key Term</h2>
      <br />
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Term"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
        />
        <button type="submit" className="primary w-full">Save</button>
        <button
          type="button"
          className="danger w-full"
          onClick={() => setIsAddModalOpen(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
)}


{selectedTerm && (
  <div
    className="modal fixed inset-0 flex items-center justify-center"
    onClick={() => setSelectedTerm(null)}
  >
    <div
      className="modal-content p-6 w-96 text-center"
      onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
    >
      <h2 className="text-2xl font-bold">{selectedTerm.title}</h2>
      <p className="mt-4 text-gray-300">{selectedTerm.description}</p>

      {/* Buttons */}
      <div className="mt-6 space-y-2">
        <button
          className="danger w-full"
          onClick={() => handleDeleteTerm(selectedTerm.id)}
        >
          Delete
        </button>
        <button
          className="secondary w-full"
          onClick={() => setSelectedTerm(null)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
