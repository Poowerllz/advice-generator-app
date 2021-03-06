name: GIT PUSH TO ANOTHER REPO

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

        env:
          GITHUB_TOKEN: ${{ secrets.TOKEN_TODEPLOY }}
        run: |

          git clone https://user:$GITHUB_TOKEN@github.com/Poowerllz/advice-generator-app # This works

          cd advice-generator-app
          git config user.name "Poowerllz"
          git config user.email "safilhoelzevirsafilho@gmail.com"

          git checkout -b main

          touch new-file.sh
          git add .
          git commit -m "Add new file"

          git remote -v # Prints:
          # origin ***github.com/owner/my-repo.git (fetch)
          # origin ***github.com/owner/my-repo.git (push)

          git push https://user:$GITHUB_TOKEN@github.com/CaduOrg/Repo-test main