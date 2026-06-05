Go over the below steps and complete all tasks specified in each step.

Step 1: Analyse the feature
- Understand the feature and ask if any questions to the author
- List down the dependencies for the feature
- Tell if there are any risks associated with the feature
- Get the confirmation from the author on the understanding by asking to click button 'Proceed' / 'Analyze further'
- If the author clicked 'analyze further' then ask what is missing. Based on the given input, start over from Step 1.
- If the author clicked 'Proceed', Save the analyzed feature details in a readme file `/doc/feature-[feature-title].md` then start Step2 automatically

Step 2: Create High level stories
- Follow the user story creation instructions to split into user stories.
- Once created user stories, check with Author  by asking to click button 'Proceed' / 'Add more'
- If the author clicked 'Add more', then ask the author what is missing.  Based on the given input, start over from Step 2.
- If the author clicked 'Proceed', then start Step3 automatically

Step 3: Review the stories
- Pick a story from the list of stories in order
- Update the review status as 'In Progress' in the respective story readme file
- Before asking the author to review, pls make sure that the status is updated as 'In Progress' in the respective story readme file
- Ask the author to review the story one by one and get confirmation from him by clicking 'Review Completed' / 'Refine further'
- If the author clicked 'Refine further', then ask the author what is missing.  Based on the given input, modify that particular story, get confirmation from him.  Until the author clicks 'Review completed', continue refinement with the author by asking his inputs.
- If the author clicked 'Review Completed', then update the review status as completed in the respective story readme file.
- Repeat Step3 until all remaining stories are reviewed
- Once all stories are completed, then start Step4 automatically

Step 4: Finish the backlog creation
- Create a csv file to include all stories in a single file with proper table format.
- Below columns should be there
  - **Title**: [Story Title]
  - **Description**: [Brief description of the story]
  - **Acceptance Criteria**:
    - [Criterion 1]
    - [Criterion 2]
    - [Criterion 3]
  - **Priority**: [High/Medium/Low]
  - **Estimation**: [Story points or time estimate]
  - **Priority order** [1/2/3]
  - **Review Status**: [Not Started/In Progress/Completed]
  - **Status**: [Not Started/In Progress/Completed/Blocked]

Step 5: Share the feedback
- Share the experience how the instructions are helping you in generating responses
- Share improvement areas in the instructions
- Tell me how the author is giving the inputs to you
- Give rating(1-5) for the current session, how it really went. 1 is low, 5 is high
  - Rating should be depend on your feedback
