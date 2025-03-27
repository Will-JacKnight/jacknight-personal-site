// This script scans the posts directory and generates an index.json file
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to posts directory and output file
const postsDir = path.join(__dirname, '../public/posts');
const outputFile = path.join(postsDir, 'index.json');

// Function to scan the posts directory and generate the index
async function generatePostsIndex() {
  console.log('Generating posts index...');
  
  try {
    // Read all files in the posts directory
    const files = fs.readdirSync(postsDir);
    
    // Filter for only markdown files and exclude index.json
    const mdFiles = files.filter(filename => 
      filename.endsWith('.md')
    );
    
    // Process each markdown file to extract metadata
    const postsData = mdFiles.map(filename => {
      const filePath = path.join(postsDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Parse front matter
      const { data } = matter(fileContent);
      
      // Generate slug from filename
      const slug = filename.replace('.md', '');
      
      // Return post metadata
      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        description: data.description || '',
        tags: data.tags || []
      };
    });
    
    // Sort posts by date (newest first)
    postsData.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    
    // Write the index.json file
    fs.writeFileSync(
      outputFile, 
      JSON.stringify(postsData, null, 2)
    );
    
    console.log(`Generated index.json with ${postsData.length} posts`);
  } catch (error) {
    console.error('Error generating posts index:', error);
    process.exit(1);
  }
}

// Run the function
generatePostsIndex(); 