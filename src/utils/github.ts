import type { Project } from '../types/project';
import { selectedRepos } from '../data/selectedRepos';

export async function fetchGitHubProjects(username: string): Promise<Project[]> {
  try {
    // Fetch user's repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await reposResponse.json();
    
    // Filter only selected repositories
    const filteredRepos = repos.filter((repo: any) => 
      selectedRepos.includes(repo.name)
    );
    
    // Fetch additional details for each repository
    const detailedRepos = await Promise.all(
      filteredRepos.map(async (repo: any) => {
        try {
          // Fetch repository languages
          const languagesResponse = await fetch(repo.languages_url);
          const languages = await languagesResponse.json();
          
          // Fetch repository readme
          const readmeResponse = await fetch(`https://api.github.com/repos/${repo.full_name}/readme`);
          const readmeData = await readmeResponse.json();
          const readme = readmeData.content ? atob(readmeData.content) : '';
          
          // Generate screenshots array
          const screenshots = [
            // Main repository preview
            `https://opengraph.githubassets.com/1/${repo.full_name}`,
            // Repository insights
            `https://opengraph.githubassets.com/1/${repo.full_name}/insights`,
            // Code frequency graph
            `https://opengraph.githubassets.com/1/${repo.full_name}/graphs/code-frequency`
          ];
          
          // If there's a homepage, add its screenshot
          if (repo.homepage) {
            screenshots.push(`https://api.microlink.io?url=${encodeURIComponent(repo.homepage)}&screenshot=true&meta=false&embed=screenshot.url`);
          }

          return {
            id: repo.id.toString(),
            title: repo.name,
            description: repo.description || 'No description available',
            thumbnail: screenshots[0],
            category: 'Open Source',
            technologies: Object.keys(languages),
            links: {
              live: repo.homepage,
              github: repo.html_url
            },
            details: {
              challenge: 'Extracting from README...',
              solution: 'Extracting from README...',
              impact: `${repo.stargazers_count} stars, ${repo.forks_count} forks, ${repo.watchers_count} watchers`
            },
            images: screenshots,
            featured: repo.stargazers_count > 0,
            readme: readme
          };
        } catch (error) {
          console.error(`Error fetching details for ${repo.name}:`, error);
          return null;
        }
      })
    );

    return detailedRepos.filter(Boolean);
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}