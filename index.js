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
			var cw = 0;
			for (var i=0;i<latlngs.length-1;i++){
				cw += (latlngs[i+1][0]-latlngs[i][0])*(latlngs[i+1][1]+latlngs[i][1]);
			}
			return cw > 0;
		};
	if (isClockWise(coor[0]) == reversed ) coor[0].reverse();		// outer ring
	for(var i=1; i< coor.length; i++){
		if (isClockWise(coor[i]) != reversed ) coor[i].reverse();	// inner rings
	}
	 return pol(coor, poly.properties);
}
