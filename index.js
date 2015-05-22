var pol = require('turf-polygon');

/**
* turf.rewind
* Function that makes outer ring clockwise and inner rings counterclockwise to meet some cases standards
* Uses [Shoelace Formula]{@link http://en.wikipedia.org/wiki/Shoelace_formula}
* @param {Feature<(Polygon)>} poly - single Polygon Feature
* @param {Boolean} reversed - if you want reversed winding
* @return {Feature<(Polygon)>} 
* @author   Abel Vázquez
* @version 1.0.0
*/
module.exports = function(poly, reversed) {
	if (poly.geometry === void 0 || poly.geometry.type !== 'Polygon' ) throw('"turf-rewind" only accepts polygon type input');
	reversed = (reversed =! void 0)? reversed : false;
	var 
		coor = poly.geometry.coordinates.slice(),
		isClockWise = function(latlngs){
			return 0 < latlngs.reduce(function(a,b,c,d){return a + ((c < d.length - 1) ? (d[c+1][0] - b[0]) * (d[c+1][1] + b[1]) : 0)},0);
		};
	isClockWise(coor[0]) === reversed && coor[0].reverse();		// outer ring
	for(var i=1; i< coor.length; i++){
		isClockWise(coor[i]) !== reversed && coor[i].reverse();	// inner rings
	}
	 return pol(coor, poly.properties);
}
