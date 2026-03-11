import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Initialize Supabase admin client
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const app = express();

// Necessário para o Vercel fazer o parse do body
app.use(express.json());

// API Routes
app.get('/api/users', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) throw error;
    res.json(data.users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name }
    });
    if (error) throw error;
    res.json(data.user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (error) throw error;
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Exporta o app do Express para o Vercel transformar em Serverless Function
export default app;
