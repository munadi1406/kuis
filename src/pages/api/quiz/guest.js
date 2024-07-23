// import { supabase } from "../../../lib/supabase";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
function generateRandomUsername(length = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let username = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters[randomIndex];
  }
  return username;
}

function generateRandomEmail(domain = "example.com", length = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let username = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters[randomIndex];
  }
  return `${username}@${domain}`;
}

function generateRandomPassword(length = 12) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const allCharacters = lowercase + uppercase + numbers + symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }

  return password;
}


export const POST = async ({ request, cookies }) => {
  const { token, namaLengkap } = await request.json();

  // Cek token kuis
  let { data: quizData, error: quizError } = await supabase
    .from("quiz")
    .select("id")
    .eq("token", token)
    .single();

  if (quizError || !quizData) {
    return new Response(
      JSON.stringify({
        message: "Token Kuis Yang Anda Masukkan Salah",
      }),
      { status: 409 }
    );
  }

  // Generate random credentials
  const email = generateRandomEmail("gmail.com", 9);
  const username = generateRandomUsername(8);
  const password = generateRandomPassword(10);

  // Sign up user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "users",
        roleUser: "Siswa",
        username,
      },
    },
  });

  if (signUpError) {
    return new Response(
      JSON.stringify({
        message: signUpError.message,
      }),
      { status: 500 }
    );
  }

  // Insert detail user
  const { data: detailUserData, error: detailUserError } = await supabase
    .from("detail_user")
    .insert([
      {
        id_user: signUpData.user.id,
        username: username,
        email: signUpData.user.email,
        nama_lengkap: namaLengkap,
        role: "users",
      },
    ])
    .select();

  if (detailUserError) {
    return new Response(
      JSON.stringify({
        message: detailUserError.message,
      }),
      { status: 500 }
    );
  }

  

  return new Response(
    JSON.stringify({
      message: "Berhasil",
      uid: signUpData.user.id,
      email,
      password
    }),
    { status: 200 }
  );
};

