#!/bin/bash

# commit.sh - A simple script to commit blog changes in a single run
# Created by AI Assistant

# Set colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Blog Quick Commit Tool ===${NC}\n"

# Navigate to the project root directory
# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
# Navigate to project root (assuming script is in src/content/blog)
cd "$SCRIPT_DIR/../../../"

echo -e "${BLUE}Working from directory: $(pwd)${NC}\n"

# Check if there are any changes
if [[ -z $(git status -s) ]]; then
  echo -e "${YELLOW}No changes to commit.${NC}"
  exit 0
fi

# Show current git status
echo -e "${BLUE}Current git status:${NC}"
git status -s
echo ""

# Prompt for commit message
read -p "Enter commit message: " commit_message

if [[ -z "$commit_message" ]]; then
  echo -e "${YELLOW}Commit message cannot be empty. Using default message.${NC}"
  commit_message="Update blog content and RSS feed"
fi

# Add all changes
echo -e "\n${BLUE}Adding all changes...${NC}"
git add .

# Commit changes
echo -e "\n${BLUE}Committing changes...${NC}"
git commit -m "$commit_message"

# Push changes if confirmed
echo -e "\n${YELLOW}Do you want to push the changes to the remote repository? (y/n)${NC}"
read -p "" push_confirmation

if [[ "$push_confirmation" == "y" || "$push_confirmation" == "Y" ]]; then
  echo -e "\n${BLUE}Pushing changes...${NC}"
  git push
  echo -e "\n${GREEN}Changes have been pushed successfully!${NC}"
else
  echo -e "\n${YELLOW}Changes have been committed but not pushed.${NC}"
fi

echo -e "\n${GREEN}Done!${NC}" 