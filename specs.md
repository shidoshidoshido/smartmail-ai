# SmartMail AI
 
## Features
 
- Situation input
- Tone selection
- Generate email
- Copy email
- Regenerate email
- Error handling
 
## API
 
POST /api/generate-email
 
Request
 
{
  "situation":"Request leave tomorrow because I have a fever.",
  "tone":"Professional"
}
 
Response
 
{
  "subject":"Leave Request",
  "email":"..."
}
