import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Environment variables:', {
  url: supabaseUrl ? 'exists' : 'missing',
  key: supabaseKey ? 'exists' : 'missing'
});

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importChampions() {
  try {
    // Read the CSV file
    const csvFilePath = path.join(__dirname, '../components/leaguedata.csv');
    console.log('Reading CSV file from:', csvFilePath);
    
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
    console.log('CSV file read successfully');
    
    // Parse CSV
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });
    console.log(`Parsed ${records.length} records from CSV`);

    // Transform data to match our schema
    const champions = records.map((record: any) => ({
      id: record.id,
      apiname: record.apiname,
      title: record.title,
      difficulty: parseInt(record.difficulty),
      herotype: record.herotype,
      role: record.role
    }));
    console.log('Transformed data:', champions.slice(0, 2)); // Log first two records

    // Insert into Supabase
    console.log('Attempting to insert into Supabase...');
    const { data, error } = await supabase
      .from('Champions')
      .upsert(champions, {
        onConflict: 'id'
      });

    if (error) {
      console.error('Error importing champions:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
    } else {
      console.log('Successfully imported champions:', data);
    }
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
  }
}

importChampions(); 