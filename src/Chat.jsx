import React from "react";
import "./index.css";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// Todo: Keys for Supabase

const VITE_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwbm1rZ3FmbHVqcnhva2FnY3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5Mzk3OTksImV4cCI6MTk5NTUxNTc5OX0.TUvQV7cmSvh9PHq38-fQPqpYO8zoBRku8Ml_-5Ra2Zw";
const VITE_SUPABASE_URL = "https://xpnmkgqflujrxokagctc.supabase.co";

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_KEY);

function Chat() {
  return (
    <div>
      <button>My name is </button>
    </div>
  );
}

export default Chat;
