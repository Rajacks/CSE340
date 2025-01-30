const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  console.log(data)
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="/inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
 * Build the inventory item view HTML
 * ************************************ */

Util.buildItemInventoryGrid = async function (data) {
  let item;

  if (data.length > 0) {
    item = '<section id="item-display">';
    data.forEach((vehicle) => {
      item +=
        '<title = "View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details"></title>';
      item +=
        '<img src = "' +
        vehicle.inv_image +
        '" alt = "Image of ' +
        vehicle.inv_year +
        " " +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        '"/>';
      item +=
        '<div class="car-details"><h3>' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        " Details</h3>";
      item +=
        "<p class='grey'><span class='details'>Price</span>: <span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span></p>";
      item +=
        "<p><span class='details'>Description</span>: " +
        vehicle.inv_description +
        "</p>";
      item +=
        "<p class='grey'><span class='details'>Color</span>: " +
        vehicle.inv_color +
        "</p>";
      item +=
        "<p><span class='details'>Miles</span>: " + vehicle.inv_miles + "</p>";
      item += "</div></div>";
    });
    item += "</section>";
  } else {
    item += '<p class=notice">Sorry, no matching vehicle found. </p>';
  }
  return item;
};

Util.buildItemInventoryGrid = (inventoryData) => {
  const content = `
      <h1 class="details-title">${inventoryData.inv_make} ${inventoryData.inv_model}</h1>
      <div class="details-info">
      <img src="${inventoryData.inv_image}" alt="${inventoryData.inv_make} ${inventoryData.inv_model}">
      <div class="details-desc"> 
      <p><span>Year:</span> ${inventoryData.inv_year}</p>
     <p><span>Price:</span> $${inventoryData.inv_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
      <p><span>Description:</span> ${inventoryData.inv_description}</p>
      <p><span>Color:</span> ${inventoryData.inv_color}</p>
      <p><span>Miles:</span> ${new Intl.NumberFormat('en-US').format(inventoryData.inv_miles)}</p>
      </div>
      </div>
  `;
  return content;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;