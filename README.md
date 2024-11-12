#Museum Curator MVP

You can find this project hosted on: https://jade-creponne-03046a.netlify.app/

##Summary:
This site was designed to simulate the streamlined experience of a digital museum curator for the Everyman. Search, add, remove, inspect, Behold. 

##Instructions:
###WARNING: Do Not Refresh the Site under ANY circumstances (unless you want to start all over) as you will lose your current collection.
There are 5 main actions a user can undertake on this site.
1. ###Search: Begin by filling out the mandatory search terms on the Search Page. Pick from one of the wonderful museums that were gracious enough to provide free web APIs, Enter the keywords or search phrases that you think will have the best chance to find what you're looking for (this is an important step as these free web APIs have a result limitation of 150), choose how to sort your results, and Finally hit the Search! button. <br/>
2. ###Add: Given that you have (at the very least) entered some search terms and hit the search button, you should now momentarily be shown a list of artworks. *Please do not touch the art* Beneath each piece, you will see a button that reads "Save to Collection"; If you see something you like, go ahead and hit that button. If you try hit that button again.. well.. you won't be able to, the museum doesn't keep doubles unless explicitly stated so we've grayed out that option now. It will automatically be saved to your very own (Curated) Saved Collection to be viewed later, which will be mulled over quickly in the next step and given a bit more detail in the last step.<br/>
3. ###Remove: At the top of the page you will see some big bright orange text reading: "Saved Collection". You can view this at any time you'd like. Go ahead and press that text and if you've added some art thus far, you'll notice a button beneath your art reading: "Remove from Collection". If you're having second thoughts or accidentally added art by mistake, go ahead and hit that button. You'll notice that it is removed immediately, so have some resolve before you press that and take responsibility for your actions.<br/>
4. ###Inspect: Under each visual representation of art in your saved collection or in the artwork list, you'll notice a bright pink title of the work. You can interact with this title to see a little more info about the art piece. A convenient back button has been included in the artwork inspect mode to take you back to.. well.. wherever you came from. Try not to take that the wrong way.<br/>
5. ###Behold: Once again, at the top of the page you can switch between searching and viewing your collection at any time through the headers labelled "Search Page" and "Saved Collection" respectively. You may re-enter a search as many times as you'd like and you won't even have to owe me favours for it. Similarly, you may admire your visually gormet sense of taste for whatever it is you're trying to cook up today, or tonight, or really any time at all. My best piece of advice, make sure you stay genuine to yourself and put together something you are proud of.

##APIs used (and closing thoughts):<br/>
Art Institute of Chicago API (seriously a one of a kind: FREE, comprehensive, humanly readable and uniform data structure for query responses. An incredible collection of art. Deserves massive praise, huge shoutout to these guys)<br/>
Europeana API (Impressive and one of the largest collections of museums and their artworks under the same roof. However this also gave way to a great deal of issues in this API in terms of correctness of information and uniformity (i.e. properties like 'title' and 'artist' will have wildly different property names in the data structure). Still one of the more uniform and well structured free APIs out there for artworks, misentered information is far and few between.)

##Installation:
- Clone + fork the repo
- navigate to the project in your preffered IDE/terminal
- run 'npm install' in your terminal to install required dependencies
- run 'npm run dev' to run the project locally on your machine

##Requirements: 
You will need the latest version of node js (Node.js v22.2.0) to run this project reliably.
You will also need a screen size of at least 450 pixels in width.
