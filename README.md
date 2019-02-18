# AMA-club-organization-app
AMA Club App
Requirements and Specification Document
2019-02-09, version 1.0

## Project Abstract - Logan
Running a student organization is a complicated process. From struggling with the logistics of setting up events to handling administrative tasks like tracking member involvement, the process of running a student organization in today's world requires several apps to manage. In the present day, apps like Slack, Google Calendars, Google Docs, and Doodle Polls would be used to handle all these day-to-day problems. The goal of the AMA Club Organization App is to streamline all these processes and centralize their use within a single app. The key features of this application will be a calendar where members can view upcoming events and RSVP to them, a profile page where members can see their standing, a social panel with access to a member list and chatrooms, and a club info page where important documents and notifications will be posted. The system will be a mobile application in which all members of the club would use and will improve the functionality of the organization as a whole. 

## Document Revision History
Rev. 1.0 <YYYY-MM-DD>: initial version

## Customer
The Customer for the AMA club organization app is the AMA organization on campus. Specifically, we are communicating with the Vice President of the club. She will be able to test the app along with other members of their executive board and selected club members throughout the development process. 

She is the direct contact for creating the applications specifications, meeting with our development group to discuss what features they would like to see. She has helped organize which features are priority and would have the biggest impact to her clubs efficiency and how they would impact the club. She has also expressed desire for certain features which would be useful but not entirely required to have a functioning application. She is able to check in with her club for further ideas which emerge over the semester and provide immediate feedback on the project as needed. We will continue to meet with her whenever we have questions or features for her to test, or when she has a new request or feedback for us.

## Competitive Landscape
Since our product incorporates many features ranging from document and calendar sharing to group messaging and polling, there are many existing applications that intersect with some functionality of our application. Because of this, it is important to analyze the competitive landscape in two distinct categories. The first category will be for direct competitors, which are cross-platform mobile applications that are geared to allow clubs or groups of people operate effectively and have features that reflect our user requirements/main features. The second category will be for indirect competitors, which will be a collection of a variety of software systems that implement a subset of the functionality of our application. We are looking into indirect competitors to ensure our solution is more effective than using multiple different applications, that together outperform the functionalities of our app, so our customer will have a solution better than their existing one. Additionally, these alternative solutions are great sources for evaluating their strengths.

Direct competitors

BAND
https://band.us/home

Summary: 
BAND is cross platform mobile application that is centered around the planning, organization and communication for groups of any kind. The app provides a hub for any groups from school clubs and workplaces to sport teams and faith groups. The usage and interface of the reflects that of a group created on Facebook, so it is intuitive to use. Essentially, a user can create a group providing a name and a photo while also deciding the visibility of the group, public or private. Upon creation, the user can invite other member via a URL, contacts, numeric code, or QR code. This variety of invitation methods is a strength of the app. Once the user enters a group, the main page resembles a feed like Facebook, allowing posts with attachments of any kinds accompanied by reactions and a comment section. This feed is another strength of the app. Additionally, the group has chat rooms, albums, a member list, polls, and quite a few ways to customize privacy and notification settings of the group. Overall this is an extremely strong direct competitor of our application.

Key Features/Strengths:
•	Information page
o	Group statistics
•	Admin and Membership privileges
•	Many ways to invite member
•	Group Chat/ Group messaging
•	Shared Calendar
•	File sharing
•	Group feed 
o	Allows attachments of photos and documents
o	Poll creation
•	Photo album
•	Members list

Areas of improvement:
While this is a very well-made app, it has shortcomings, mostly stemming form the fact that it is a one-size fits all group organization app. Because we are targeting a school organization, the AMA club, there are some specific features that BAND does not provide. First, they don’t have a live sign-in service to verify attendance at events, something our customer stated would be very helpful. Another weakness with the app is that there is no such thing as a member status. Our customer indicated that there are different member levels in the club, and that it is a top priority for member to be able to see their status to avoid a bombardment of emails, so this is a major flaw with the app. Finally, our customer indicated that it would be helpful to create checkoff lists of members, and while the app does have a members list, there is no capability to allow to make a list to check off names for various purposes.

OrgSync/ Engage
https://www.orgsync.com/
Summary:
Our other main direct competitor is a mobile app currently called OrgSync but has recently been bought by a company called Campus Labs and will eventually be called Engage. This is another club management application but it’s different from BAND because it is specific for college campuses, a definite strength. Additionally, this goes beyond just general communication and scheduling and provides quite a few management features such as budget and risk management along with customizable workflows. But the biggest aspect of the application that makes it unique is that it doesn’t target groups as individuals, but it targets campuses. The application is meant to be purchased by a university as a huge software system that provides the campus and its organizations not only a way to communicate and organize, but a way to manage and analyze the overall student involvement. Because of this, OrgSync/Engage provides many financial services along with extensive data analysis tools that both individual clubs and campus staff can utilize to get a clear picture on student involvement. These features set the application apart from its competitors, but it is important to note the business model and target consumer is a bit different
Key Features/Strengths:
•	Event planning and participation recording
o	Advertising and promotion
o	Tracking and statistic reporting
•	Secure Elections
•	Budget Management
•	Messaging
•	Document storage
•	Finance tools
•	Many statistics and Data analytics options
•	Campus Event Feed
•	Co-curricular path tool
•	Organization Registration

Areas of Improvement: 
While this system seems like a good option for a university, it is overkill for a single club, especially for our customers need. The largest flaw with the application is that it only offers its services to universities, so only clubs with universities that pay for the software can use it. This is a huge fault for our customer since UW-Madison isn’t on the list of universities that pay for the application, so they are unable to use it. Additionally, the fact that you must pay to use it is a flaw in itself. Finally, as of right now the transition to another company has limited some features and some of the above features seems to be more like promises rather than already implemented capabilities. Overall, because of the business structure, this is not a viable option for our customer but is an application that has a lot of strong features that target the same audience as us, so it is important to use it as an example to learn from.

Indirect Competitors
The following technologies are currently used by the club. Each are useful for very specific purposes, but just the fact they use so many expose disadvantages to using them. Also, some are used for purposes that they weren’t intended for or are very inefficient. An example is using pen & paper or google docs for attendance for a club with almost 100 members. These are brief summaries of the tech and their uses.
Email/Texting: Useful for mass communication and direct messaging. Members complain about spam and some people not checking.
Facebook Group: Used for communication and photo sharing, but many don’t check Facebook.
Google Docs: Used for member status, dues paid, attendance, and org documents. Only used by exec members.
Facebook Events: Good for posting event info and RSVP, but many members don’t check Facebook. 
Pen and Paper: Also used for attendance and polls. This information is commonly converted to google doc


## User Requirements
This section lists the behavior that the users see. This information needs to be presented in a logical, organized fashion. It is most helpful if this section is organized in outline form: a bullet list of major topics (e.g., one for each kind of user, or each major piece of system functionality) each with some number of subtopics.

### Primary Goals
* member profile
* sign in
* calendar
* wall

### Secondary Goals
* DM officers
* custom push notifications (outside of calendar)
* event attendence

### Reach
* polling/ election system
* exec chat room
* member list
* doc list
* liking/ commenting in feed
* general member dms

### Tentative Features- "how can we disseminate information"
* **member profile!**
    * need access code
    * ability to delete or be deleted by admin
    * check status
    * status set by exec
         * general member, active member, lead member
* **Sign-in!**
* **Calendar!**
* Polling~
* Events!
    * flag yourself as 'going'
    * event abstract/summary
* Executive chat room~
   * Schedule push notifications
* **DM Officers!**
* **Notification!**
* autocompiled newsletter~
* election system~
* **photo gallery wall!**
    * included text post/ minutes thingy
* member list!
* documents list!

## Use Cases
Use cases that support the user requirements in the previous section. Every major scenario should be represented by a use case, and every use case should say something not already illustrated by the other use cases. Diagrams (such as sequence charts) are encouraged. Ask the customer what are the most important use cases to implement by the deadline. You can have a total ordering, or mark use cases with “must have,” “useful,” or “optional.” For each use case you may list one or more concrete acceptance tests (concrete scenarios that the customer will try to see if the use case is implemented).

## User Interface Requirements- Jake
Describes any customer user interface requirements including graphical user interface requirements as well as data exchange format requirements. This also should include necessary reporting and other forms of human readable input and output. This should focus on how the feature or product and user interact to create the desired workflow. Describing your intended interface as “easy” or “intuitive” will get you nowhere unless it is accompanied by details.

## Security Requirements
Discuss what security requirements are necessary and why. Are there privacy or confidentiality issues? Is your system vulnerable to denial-of-service attacks?

## System Requirements
List here all of the external entities, other than users, on which your system will depend. For example, if your system inter-operates with sendmail, or if you will depend on Apache for the web server, or if you must target both Unix and Windows, list those requirements here. List also memory requirements, performance/speed requirements, data capacity requirements, if applicable.

## Specification- Jake
A detailed specification of the system. Every possible execution should be in the specification, though not every aspect need be covered in extraordinary depth. UML, or other diagrams, such as finite automata, or other appropriate specification formalisms, are encouraged over natural language.
