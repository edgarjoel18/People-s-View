function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
// Template that generates the HTML for one item in our list view, given the parameters passed in
var listView = function(description, details ,pictures) {

  return `
  <div class="col-md-12"> <h1> ${description} </h1>  
    


    ${details}
    
  </div>`;
  //return `<div class="col-md-12"${detail}</div>`;
}
                  


// Helper for getting the `index.html?ID=` part form the URL
var getParameterByName = function(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Airtable API Key, unique per user
var api_key = "keyehXyoUtztOdsD1";

// Get and display the data for all items
var getDataForList = function() {
  // 1. Gets the data from the Airtable API
  $.getJSON(
    `https://api.airtable.com/v0/appdbANTMEgXH1EyR/Positions?api_key=${api_key}`,
    function(data) {
      // console.log(data);
      var html = [];
      html.push(`<div class="row">`);

      // 2. Iterates over every record and uses the list template
      $.each(data.records, function(index, record) {
        // console.log(record)
        var id = record.id;
        var fields = record.fields;
        var name = fields["Name"];
        var description = fields["Description"];
        var details = fields["details"];
        var pics= fields["pictures"];
        // var pictureUrl = fields["Pictures"] ? fields["Pictures"][0].url : "";
        // var neighborhood = fields["Neighborhood"];
        // var rating = fields["Rating"];
        // var favorite = fields["Favorite"];
    // Pass all fields into the List Template
        var itemHTML = listView(description,details,pics);
        if (category === name ){
          html.push(itemHTML);
        }
        var itemHTML =listView(details);
        if (category === details){
          html.push(itemHTML);
        }
      });
      html.push(`</div>`);
      // 3. Adds HTML for every item to our page
      $(".list-view").append(html.join(""));
    },
  );
};
// Do we have an ID in the URL?
var id = getParameterByName("id");
var category = getParameterByName("category");
console.log(name);
//var catergoy=getParameterByName("category");
//console.log(details);
// If we have an ID, we should only get the data for one item
// Otherwise, we should display the data for all items
if (id) {
  getDataForId(id);
} else {
  getDataForList();
}


