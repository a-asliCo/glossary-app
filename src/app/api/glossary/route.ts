import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Handle GET request (fetch all terms)
export async function GET() {
  const { data, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .order('title', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

// Handle POST request (add a new term)
export async function POST(req: Request) {
  const { title, description } = await req.json();

  // Prevent duplicate terms (case-insensitive)
  const { data: existing } = await supabase
    .from('glossary_terms')
    .select('title')
    .ilike('title', title);

  if (existing && existing.length > 0) {
    return NextResponse.json({ error: 'This term already exists!' }, { status: 400 });
  }

  // Insert new term
  const { data, error } = await supabase
    .from('glossary_terms')
    .insert([{ title: title.toLowerCase(), description }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 201 });
}

// Handle DELETE request (delete a term by ID)
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing term ID" }, { status: 400 });
  }

  const { error } = await supabase.from("glossary_terms").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Term deleted successfully" }, { status: 200 });
}
