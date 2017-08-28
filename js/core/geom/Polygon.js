var util = require('util');
var Body = require('./Body');
var Point = require('./Point');
var Vector = require('./Vector');
var Rectangle = require('./Rectangle');

/**
 * Polygon Class
 * Parameters: Point, Vector
 */
class Polygon extends Body {
  constructor(pt, v1 = []) 
  {
    super();
    this.v = v1;
    this.p = pt || new Point();
  }
  
  setPoint(pt = null) 
  {
    this.p = pt || new Point();
    this.b = null;
  }
  
  getPoint() 
  {
    return this.p;
  }
  
  addVector(v1) 
  {
    this.v.push(v1);
    this.b = null;
  }
  
  removeVector(i = 0) {
    this.v = this.v.splice(1, 1);
    this.b = null;
  }
  
  getVector(i = 0)
  {
    return this.v[i];
  }
  
  getVectorPoint(i = 0) 
  {
    var point = this.p.clonePoint();
    for (var n = 0; n <= i; n++) {
      point.add(this.v[n]);
    }
    return point;
  }
  
  numVectors() 
  {
    return this.v.length;
  }
  
  /**
   * getBoundPoints()
   */
  getBoundPoints () {
    let bounds = this.getBounds();
    let boundMax = bounds.p.clonePoint();
    boundMax.add(bounds.v);
    return [bounds.p, boundMax];
  };

  /**
   * getBounds()
   * This method should return this Polygon's outer square boundary
   */
  getBounds()
  {
    if(this.b == null){
      var minX = Number.MAX_VALUE;
      var maxX = Number.MIN_VALUE;
      var minY = Number.MAX_VALUE;
      var maxY = Number.MIN_VALUE;
      var point = this.p.clonePoint();
      for (var n = 0; n < this.v.length; n++) {
        point.add(this.v[n]);
        if (point.x < minX) minX = point.x;
        if (point.y < minY) minY = point.y;
        if (point.x > maxX) maxX = point.x;
        if (point.y > maxY) maxY = point.y;
      }
      this.b = new Rectangle(new Point(minX, minY), new Vector(maxX - minX, maxY - minY));
    }
    return this.b;
  }
  
  sign(x)
  {
    return x < 0 ? -1:1;
  }
  
  //Checks if polygon is convex
  convex()
  {
    if (this.v.length < 3)
    {
      return false;
    }
    var xCh = 0;
    var yCh = 0;
    
    //Start from last to first
    var a = this.v[this.v.length - 1].cloneVector();
    a.subtract(v[0]);
    
    for (var i = 0; i < this.v.length - 1; i++)
    {
      var b = this.v[i].cloneVector();
      b.subtract(this.v[i + 1]);
      
      //Check if sign changes more than twice
      if (sign(a.x) != sign(b.x)) xCh++;
      if (sign(a.y) != sign(b.y)) yCh++;
      
      //Update previous
      a = b;
    }
    
    return xCh<=2 && yCh<=2;
  }
  
  //Will use triangle function if polygon is a triangle(faster)
  pointInPolygon(pt) {
    if (this.v.length == 3) {
      return this.insideTriangle(pt);
    }else if (this.v.length > 3) {
      return this.insidePolygon(pt);
    }
    //Invalid Polygon
    return false;
  }
  
  //Tests if point is inside polygon
  insidePolygon(pt) {
    var c = false;
    var i, j;
    for (i = 0, j = this.v.length - 1; i < this.v.length; j = i++) {
      var viP = this.getVectorPoint(i);
      var vjP = this.getVectorPoint(j);
      if ((((viP.y <= pt.y) && (pt.y < vjP.y)) ||
      ((vjP.y <= pt.y) && (pt.y < viP.y))) &&
      (pt.x < (vjP.x - viP.x) * (pt.y - viP.y) / (vjP.y - viP.y) + viP.x)){
        c = !c;
      }
    }
    return c;
  }
  
  //Tests if point is inside a triangle
  insideTriangle(pt)
  {
    var ax, ay, bx, by, cx, cy, apx, apy, bpx, bpy, cpx, cpy, cCrossap, bCrosscp, aCrossbp;
    var a = this.p.clonePoint();
    a.add(this.v[0]);
    var b = a.clonePoint();
    b.add(this.v[1]);
    var c = b.clonePoint();
    c.add(this.v[2]);
    
    ax = c.x - b.x;
    ay = c.y - b.y;
    bx = a.x - c.x;
    by = a.y - c.y;
    cx = b.x - a.x;
    cy = b.y - a.y;
    apx = pt.x - a.x;
    apy = pt.y - a.y;
    bpx = pt.x - b.x;
    bpy = pt.y - b.y;
    cpx = pt.x - c.x;
    cpy = pt.y - c.y;
    
    aCrossbp = ax * bpy - ay * bpx;
    cCrossap = cx * apy - cy * apx;
    bCrosscp = bx * cpy - by * cpx;
    
    return aCrossbp >= 0 && bCrosscp >= 0 && cCrossap >= 0;
  }
  
  // toString() 
  // {
  //   var s: = "Polygon {";
  //   s += "x = " + p.x + ", y = " + p.y + " ";
  //   for each(var v1 in v) {
  //     s += v1;
  //   }
  //   s += "}";
  //   return s;
  // }
}

module.exports = Polygon;






