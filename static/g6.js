! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("G6", [], e) : "object" == typeof exports ? exports.G6 = e() : t.G6 = e()
}(this, function () {
    return function (t) {
        function e(i) {
            if (n[i]) return n[i].exports;
            var r = n[i] = {
                exports: {},
                id: i,
                loaded: !1
            };
            return t[i].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.p = "", e(0)
    }([
        function (t, e, n) {
            "use strict";
            var i = {},
                r = n(59),
                o = n(75);
            i.Color = n(76), i.Math = n(8), i.Matrix = n(4), i.Tween = n(55), i.Canvas = n(10), i.Layouts = n(69), i.Graph = n(13), i.Net = n(192), i.Tree = n(196), i.Global = i.Graph.Global, i.Handler = i.Graph.Handler, i.Shape = i.Graph.Shape, i.Util = i.Graph.Util, i.Item = i.Graph.Item, i.registNode = i.Graph.registNode, i.registEdge = i.Graph.registEdge, i.Layout = i.Layouts, i.registerNode = i.Graph.registNode, i.registerEdge = i.Graph.registEdge, i.registBehaviour = i.Handler.registBehaviour, r.tracking = !0, i.track = function (t) {
                r.tracking = t
            }, i.version = o, n(194), window.G6 = i, t.exports = i
        },
        function (t, e, n) {
            var i = n(114);
            t.exports = i
        },
        function (t, e) {
            "use strict";
            var n = {
                resetMode: function (t, e) {
                    var i = [],
                        r = void 0;
                    e._off();
                    for (var o = 0; o < t.length; o++) {
                        if (r = n[t[o]], !r) return;
                        r.dependences && r.dependences.forEach(function (t) {
                            t && i.indexOf(t) === -1 && (t(e), i.push(t))
                        }), r && i.indexOf(r) === -1 && r(e)
                    }
                }, registBehaviour: function (t, e) {
                    n[t] = e
                }
            };
            t.exports = n
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(31),
                o = n(18),
                a = n(30),
                s = n(142),
                u = n(145),
                c = n(64),
                h = {};
            i.mix(h, i, a, r, o, u, c, s), t.exports = h
        },
        function (t, e, n) {
            var i = {
                Matrix3: n(106),
                Vector2: n(107),
                Vector3: n(108)
            };
            t.exports = i
        },
        function (t, e, n) {
            var i = n(1),
                r = n(36),
                o = n(6),
                a = n(4).Vector3,
                s = function (t) {
                    s.superclass.constructor.call(this, t)
                };
            s.ATTRS = {}, i.extend(s, r), i.augment(s, {
                isShape: !0,
                createPath: function () {}, drawInner: function (t) {
                    var e = this,
                        n = e.__attrs;
                    e.createPath(t);
                    var r = t.globalAlpha;
                    if (e.hasFill()) {
                        var o = n.fillOpacity;
                        i.isNull(o) || 1 === o ? t.fill() : (t.globalAlpha = o, t.fill(), t.globalAlpha = r)
                    }
                    if (e.hasStroke()) {
                        var a = e.__attrs.lineWidth;
                        if (a > 0) {
                            var s = n.strokeOpacity;
                            i.isNull(s) || 1 === s || (t.globalAlpha = s), t.stroke()
                        }
                    }
                }, isPointInPath: function () {
                    return !1
                }, isHitBox: function () {
                    return !0
                }, isHit: function (t, e) {
                    var n = this,
                        i = new a(t, e, 1);
                    if (n.invert(i), n.isHitBox()) {
                        var r = n.getBBox();
                        if (r && !o.box(r.minX, r.maxX, r.minY, r.maxY, i.x, i.y)) return !1
                    }
                    var s = n.__attrs.clip;
                    return s ? !!s.inside(t, e) && n.isPointInPath(i.x, i.y) : n.isPointInPath(i.x, i.y)
                }, calculateBox: function () {
                    return null
                }, clearTotalMatrix: function () {
                    this.__cfg.totalMatrix = null, this.__cfg.region = null
                }, clearBBox: function () {
                    this.__cfg.box = null, this.__cfg.region = null
                }, getBBox: function () {
                    var t = this.__cfg.box;
                    return t || (t = this.calculateBox(), t && (t.x = t.minX, t.y = t.minY, t.width = t.maxX - t.minX, t.height = t.maxY - t.minY), this.__cfg.box = t), t
                }
            }), t.exports = s
        },
        function (t, e, n) {
            var i = n(21),
                r = n(22),
                o = n(15),
                a = n(20);
            t.exports = {
                line: function (t, e, n, r, o, a, s) {
                    var u = i.box(t, e, n, r, o);
                    if (!this.box(u.minX, u.maxX, u.minY, u.maxY, a, s)) return !1;
                    var c = i.pointDistance(t, e, n, r, a, s);
                    return !isNaN(c) && c <= o / 2
                }, polyline: function (t, e, n, i) {
                    var r = t.length - 1;
                    if (r < 1) return !1;
                    for (var o = 0; o < r; o++) {
                        var a = t[o][0],
                            s = t[o][1],
                            u = t[o + 1][0],
                            c = t[o + 1][1];
                        if (this.line(a, s, u, c, e, n, i)) return !0
                    }
                    return !1
                }, cubicline: function (t, e, n, i, r, a, s, u, c, h, l) {
                    return o.pointDistance(t, e, n, i, r, a, s, u, h, l) <= c / 2
                }, quadraticline: function (t, e, n, i, o, a, s, u, c) {
                    return r.pointDistance(t, e, n, i, o, a, u, c) <= s / 2
                }, arcline: function (t, e, n, i, r, o, s, u, c) {
                    return a.pointDistance(t, e, n, i, r, o, u, c) <= s / 2
                }, rect: function (t, e, n, i, r, o) {
                    return t <= r && r <= t + n && e <= o && o <= e + i
                }, circle: function (t, e, n, i, r) {
                    return Math.pow(i - t, 2) + Math.pow(r - e, 2) <= Math.pow(n, 2)
                }, box: function (t, e, n, i, r, o) {
                    return t <= r && r <= e && n <= o && o <= i
                }
            }
        },
        function (t, e) {
            "use strict";
            t.exports = {
                colors: ["#4E7CCC", "#36B3C3", "#4ECDA5", "#94E08A", "#E2F194", "#EDCC72", "#F8AB60", "#F9815C", "#EB4456", "#C82B3D"],
                guide: {},
                grid: {
                    line: {
                        stroke: "#F5F5F5",
                        lineWidth: 1
                    },
                    forceAlign: !0,
                    cell: 10
                },
                nodeStyle: {
                    stroke: "#666",
                    fill: "#fff",
                    lineWidth: 1,
                    radius: 4,
                    fillOpacity: .1
                },
                nodeDelegationStyle: {
                    stroke: "#108EE9",
                    lineDash: [3, 3]
                },
                edgeDelegationStyle: {
                    stroke: "#108EE9",
                    lineDash: [3, 3]
                },
                nodePadding: [8, 16],
                nodeLabelStyle: {
                    fill: "#666",
                    textAlign: "center",
                    textBaseline: "middle",
                    fontSize: 14
                },
                edgeStyle: {
                    lineWidth: 1,
                    stroke: "#999",
                    lineAppendWidth: 10
                },
                edgeLabelStyle: {
                    fill: "#666",
                    textAlign: "center",
                    textBaseline: "middle"
                },
                edgeLabelRectStyle: {
                    fill: "white"
                },
                anchorPointStyle: {
                    fill: "#108EE9",
                    lineWidth: .1,
                    r: 4
                },
                anchorPointHoverStyle: {
                    lineWidth: 6,
                    stroke: "#108EE9",
                    strokeOpacity: .2
                },
                frameRectStyle: {
                    fill: "blue",
                    opacity: .1
                },
                nodeControlPointStyle: {
                    r: 4,
                    fill: "#fff",
                    shadowBlur: 4,
                    shadowColor: "#666"
                },
                edgeControlPointStyle: {
                    r: 4,
                    fill: "#fff",
                    shadowBlur: 4,
                    shadowColor: "#666"
                },
                nodeAcitvedBoxStyle: {},
                nodeActivedBoxStyle: {
                    stroke: "#108EE9",
                    lineDash: [3, 3]
                },
                modalRectStyle: {
                    fill: "white",
                    fillOpacity: .8
                },
                zIndex: {
                    node: 1,
                    edge: 0,
                    nodeLabel: 5,
                    edgeLabel: 4,
                    edgeLabelBackground: 3
                },
                minPixelRatio: 1,
                treeButtonStyle: {
                    fill: "#fff",
                    stroke: "#333"
                },
                wheelZoomTimeout: 200,
                toolTipTimeout: 200,
                treeButtonRadius: 6,
                treeButtonPadding: 3,
                fitViewPadding: 10,
                updateDuration: 450,
                enterDuration: 450,
                leaveDuration: 450,
                updateEasing: "easeOutQuart",
                enterEasing: "easeOutQuart",
                leaveEasing: "easeOutQuart",
                fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\u5fae\u8f6f\u96c5\u9ed1", SimSun, "sans-serif"'
            }
        },
        function (t, e, n) {
            var i = n(105);
            t.exports = i
        },
        function (t, e, n) {
            "use strict";
            var i = n(7),
                r = n(3),
                o = {
                    addNode: function (t, e) {
                        var n = void 0,
                            i = void 0,
                            r = void 0,
                            a = t.get("gridAssist"),
                            s = a && a.forceAlign;
                        t._on(e, function (e) {
                            n = t.get("addingType"), i = t.get("addingModel"), "node" === n && (i.x = e.x, i.y = e.y, s && o.alignPoint(i, a.cell), r = t.addItem("node", i), t.clearAllActived(), t.setItemActived(r), t.updateRollback(), t.draw(!1), t.endAdd(r))
                        })
                    }, onWheelZoom: function (t, e, n) {
                        var r = setTimeout(function () {}, i.wheelZoomTimeout),
                            o = 1;
                        t._on("wheelzoom", function () {
                            clearTimeout(r), o && (e(), o = 0), r = setTimeout(function () {
                                n(), o = 1
                            }, i.wheelZoomTimeout)
                        })
                    }, autoText: function (t) {
                        var e = t.getKeyShape(),
                            n = t.getGroup(),
                            i = r.getBBox(e, n.getParent().getParent().getParent()),
                            o = i.maxX - i.minX;
                        n.traverseChildren(function (t) {
                            if ("text" === t.type && t.get("freezePoint")) {
                                var e = t.getBBox(),
                                    n = e.maxX - e.minX;
                                n > 7 / 3 * o ? (t.hide(), t.set("autoTextHide", !0)) : (t.set("autoTextHide", !1), t.show())
                            }
                        })
                    }, autoTexts: function (t) {
                        var e = t.getNodes();
                        r.each(e, function (t) {
                            o.autoText(t)
                        }), t.draw()
                    }, hideTexts: function (t) {
                        var e = t.get("rootGroup");
                        e.traverseChildren(function (t) {
                            "text" === t.type && t.hide()
                        }), t.draw(!1)
                    }, showText: function (t) {
                        var e = t.getGroup();
                        e.traverseChildren(function (t) {
                            "text" === t.type && t.show()
                        })
                    }, showTexts: function (t) {
                        var e = t.get("rootGroup");
                        e.traverseChildren(function (t) {
                            "text" === t.type && t.show()
                        }), t.draw(!1)
                    }, alignPoint: function (t, e) {
                        t.x = Math.round(t.x / e) * e, t.y = Math.round(t.y / e) * e
                    }, getControlInfo: function (t, e, n, i, r) {
                        var o = t.x - n.x,
                            a = t.y - n.y,
                            s = i.getBBox(),
                            u = i.getPosition(),
                            c = void 0,
                            h = void 0;
                        switch ("frontCanvas" === r && (u = i.getCenter()), e) {
                        case 0:
                            c = s.width - o, h = s.height - a;
                            break;
                        case 1:
                            c = s.width + o, h = s.height - a;
                            break;
                        case 2:
                            c = s.width + o, h = s.height + a;
                            break;
                        default:
                            c = s.width - o, h = s.height + a
                        }
                        var l = [c, h];
                        return {
                            x: u.x + o / 2,
                            y: u.y + a / 2,
                            size: l
                        }
                    }, dragEdgeExtremePoint: function (t, e, n, i) {
                        var r = t.get("behaviourSignal"),
                            o = void 0,
                            a = void 0,
                            s = void 0,
                            u = void 0,
                            c = void 0,
                            h = void 0,
                            l = void 0;
                        t._on("mousedown", function (t) {
                            a = t.shape, s = t.shape, u = e(t), c = n(t, u), !u || u.isSourcePoint(c) || u.isTargetPoint(c) || (u = void 0), u && a && a.hasClass("anchor-point") && u.updateModel({
                                controlPoints: [a.get("point"), a.get("point")],
                                sourceAnchor: a.get("index")
                            })
                        }), t._on("dragmove", function (e) {
                            t.isEdge(u) && (r.draggingEdge = !0, o = e.item, l = {
                                x: e.x,
                                y: e.y,
                                controlPointIndex: c
                            }, u.showDelegation(l), t.refreshFront())
                        }), t.on("mouseup", function (e) {
                            t.isEdge(u) && (o = e.item, a = e.shape, h = {}, r.draggingEdge && (a && "anchor-point" === a.get("class") ? a.get("linkable") !== !1 && a !== s && (u.isSourcePoint(c) ? (h.source = o.get("id"), h.sourceAnchor = a.get("index")) : u.isTargetPoint(c) && (h.target = o.get("id"), h.targetAnchor = a.get("index"))) : t.isNode(o) && (u.isSourcePoint(c) ? (h.source = o.get("id"), h.sourceAnchor = null) : u.isTargetPoint(c) && (h.target = o.get("id"), h.targetAnchor = null)), u.hideDelegation()), i(u, h), t.fire("dragedgeend", {
                                edge: u,
                                shape: a,
                                item: o
                            }), s = void 0, o = void 0, u = void 0, h = void 0, c = void 0, l = void 0, a = void 0, r.draggingEdge = void 0)
                        })
                    }
                };
            t.exports = o
        },
        function (t, e, n) {
            var i = n(79),
                r = n(38);
            i.G = r, i.Group = r.Group, i.Shape = {}, i.Shape.Marker = r.Marker, i.Util = n(54), i.Matrix = n(4), t.exports = i
        },
        function (t, e, n) {
            var i = n(78);
            t.exports = i
        },
        function (t, e, n) {
            function i(t, e, n) {
                var i = new s(1, 0).angleTo(t),
                    r = i - u,
                    o = i + u,
                    a = 6 + 3 * n;
                return [{
                        x: e.x - a * Math.cos(r),
                        y: e.y - a * Math.sin(r)
                    },
                    e, {
                        x: e.x - a * Math.cos(o),
                        y: e.y - a * Math.sin(o)
                    }
                ]
            }

            function r(t, e) {
                t.moveTo(e[0].x, e[0].y), t.lineTo(e[1].x, e[1].y), t.lineTo(e[2].x, e[2].y)
            }

            function o(t, e, n, o) {
                r(t, i(e, n, o))
            }

            function a(t, e, n) {
                var i = n / Math.sin(u);
                return t.setLength(i / 2), e.sub(t), e
            }
            var s = n(4).Vector2,
                u = Math.PI / 6;
            t.exports = {
                makeArrow: o,
                getEndPoint: a
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(127);
            n(124), n(126), i.Mapper = n(62), i.Item = n(61), i.Shape = n(63), i.Util = n(3), i.Global = n(7), i.Handler = n(2), i.IdGroup = n(26), i.SortGroup = n(60), i.HtmlShape = n(125), i.registNode = i.Shape.registNode, i.registEdge = i.Shape.registEdge, t.exports = i
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }
            var r = n(33),
                o = n(1),
                a = function () {
                    function t() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        i(this, t);
                        var n = this;
                        n.options = e, o.isFunction(e.callback) || (n.options.callback = function () {})
                    }
                    return t.prototype._prepareRoot = function () {
                        var t = this;
                        t.rootNode = new r(t.root, t.options)
                    }, t.prototype.execute = function () {
                        throw new Error("please override this method")
                    }, t.prototype.getNodes = function () {
                        var t = this,
                            e = t.execute();
                        e.translate(-(e.x + e.width / 2 + e.hgap), -(e.y + e.height / 2 + e.vgap));
                        var n = [];
                        return e.eachNode(function (t) {
                            n.push(t.data)
                        }), n
                    }, t.prototype.getEdges = function () {
                        var t = this,
                            e = t.options,
                            n = e.extraEdges,
                            i = this.rootNode,
                            r = [];
                        return i.eachNode(function (t) {
                            t.children.forEach(function (e) {
                                r.push({
                                    id: t.id + "-" + e.id,
                                    source: t.id,
                                    target: e.id
                                })
                            })
                        }), r.concat(n), r
                    }, t
                }();
            t.exports = a
        },
        function (t, e, n) {
            function i(t, e, n, i, r) {
                var o = 1 - r;
                return o * o * (o * i + 3 * r * n) + r * r * (r * t + 3 * o * e)
            }

            function r(t, e, n, i, r) {
                var o = 1 - r;
                return 3 * (((e - t) * o + 2 * (n - e) * r) * o + (i - n) * r * r)
            }

            function o(t, e, n, r, o, a, s, u, h, l, d) {
                var f, g, p, v, m, x, y, w, b = .005,
                    _ = 1 / 0,
                    M = 1e-4,
                    S = new c(h, l);
                for (g = 0; g < 1; g += .05) p = new c(i(t, n, o, s, g), i(e, r, a, u, g)), v = p.distanceToSquared(S), v < _ && (f = g, _ = v);
                _ = 1 / 0;
                for (var A = 0; A < 32 && !(b < M); A++) y = f - b, w = f + b, p = new c(i(t, n, o, s, y), i(e, r, a, u, y)), v = p.distanceToSquared(S), y >= 0 && v < _ ? (f = y, _ = v) : (x = new c(i(t, n, o, s, w), i(e, r, a, u, w)), m = x.distanceToSquared(S), w <= 1 && m < _ ? (f = w, _ = m) : b *= .5);
                return d && (d.x = i(t, n, o, s, f), d.y = i(e, r, a, u, f)), Math.sqrt(_)
            }

            function a(t, e, n, i) {
                var r, o, a, s = 3 * t - 9 * e + 9 * n - 3 * i,
                    u = 6 * e - 12 * n + 6 * i,
                    c = 3 * n - 3 * i,
                    l = [];
                if (h.equal(s, 0)) h.equal(u, 0) || (r = -c / u, r >= 0 && r <= 1 && l.push(r));
                else {
                    var d = u * u - 4 * s * c;
                    h.equal(d, 0) ? l.push(-u / (2 * s)) : d > 0 && (a = Math.sqrt(d), r = (-u + a) / (2 * s), o = (-u - a) / (2 * s), r >= 0 && r <= 1 && l.push(r), o >= 0 && o <= 1 && l.push(o))
                }
                return l
            }

            function s(t, e, n, i, r) {
                var o = -3 * e + 9 * n - 9 * i + 3 * r,
                    a = t * o + 6 * e - 12 * n + 6 * i;
                return t * a - 3 * e + 3 * n
            }

            function u(t, e, n, i, r, o, a, u, c) {
                l.isNull(c) && (c = 1), c = c > 1 ? 1 : c < 0 ? 0 : c;
                for (var h = c / 2, d = 12, f = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], g = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], p = 0, v = 0; v < d; v++) {
                    var m = h * f[v] + h,
                        x = s(m, t, n, r, a),
                        y = s(m, e, i, o, u),
                        w = x * x + y * y;
                    p += g[v] * Math.sqrt(w)
                }
                return h * p
            }
            var c = n(4).Vector2,
                h = n(8),
                l = n(1);
            t.exports = {
                at: i,
                derivativeAt: r,
                projectPoint: function (t, e, n, i, r, a, s, u, c, h) {
                    var l = {};
                    return o(t, e, n, i, r, a, s, u, c, h, l), l
                }, pointDistance: o,
                extrema: a,
                len: u
            }
        },
        function (t, e, n) {
            t.exports = n(91)
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                if (o.isNumeric(t) && o.isNumeric(e)) return a.number(t, e);
                if (o.isString(t) && o.isString(e)) {
                    var n = new u(t),
                        i = new u(e);
                    if (n.getType() && i.getType()) return s.color(n, i)
                }
            }

            function r(t, e) {
                if (o.isNumeric(t) && o.isNumeric(e)) return a.unNumber(t, e);
                if (o.isString(t) && o.isString(e)) {
                    var n = new u(t),
                        i = new u(e);
                    if (n.getType() && i.getType()) return s.unColor(n, i)
                }
            }
            var o = n(1),
                a = n(102),
                s = n(99),
                u = n(16);
            t.exports = {
                singular: i,
                unSingular: r
            }
        },
        function (t, e, n) {
            "use strict";

            function i(t) {
                var e = [];
                return r.each(t, function (t) {
                    e.push(t.x), e.push(t.y)
                }), e
            }
            var r = n(1),
                o = n(109),
                a = {};
            r.mix(a, {
                pathToArray: o.toArray,
                pathToString: o.toString,
                pathToCurve: o.toCurve,
                pathToAbsolute: o.toAbsolute,
                pathCatmullRomToBezier: o.catmullRomToBezier,
                getRectPath: o.rectPath,
                pathIntersection: o.intersection,
                getEllipsePath: function (t, e, n, i) {
                    var r = [
                        ["M", t, e - i],
                        ["a", n, i, 0, 1, 1, 0, 2 * i],
                        ["a", n, i, 0, 1, 1, 0, -2 * i],
                        ["z"]
                    ];
                    return r
                }, pointsToPolygon: function (t, e) {
                    if (!t.length) return "";
                    for (var n = "", i = "", o = 0, a = t.length; o < a; o++) {
                        var s = t[o];
                        i = 0 === o ? "M{x} {y}" : "L{x} {y}", n += r.substitute(i, s)
                    }
                    return e && (n += "Z"), n
                }, pointsToCurve: function (t) {
                    t = i(t);
                    var e = a.pathCatmullRomToBezier(t);
                    return e.unshift(["M", t[0], t[1]]), e
                }, getWaterPositions: function (t, e, n, i) {
                    return 0 === e ? [
                        [t + .5 * n / Math.PI / 2, i / 2],
                        [t + .5 * n / Math.PI, i],
                        [t + n / 4, i]
                    ] : 1 === e ? [
                        [t + .5 * n / Math.PI / 2 * (Math.PI - 2), i],
                        [t + .5 * n / Math.PI / 2 * (Math.PI - 1), i / 2],
                        [t + n / 4, 0]
                    ] : 2 === e ? [
                        [t + .5 * n / Math.PI / 2, -i / 2],
                        [t + .5 * n / Math.PI, -i],
                        [t + n / 4, -i]
                    ] : [
                        [t + .5 * n / Math.PI / 2 * (Math.PI - 2), -i],
                        [t + .5 * n / Math.PI / 2 * (Math.PI - 1), -i / 2],
                        [t + n / 4, 0]
                    ]
                }, getWaterPath: function (t, e, n, i, r, o, s) {
                    for (var u = 2 * Math.ceil(2 * t / n * 4), c = []; i < 2 * -Math.PI;) i += 2 * Math.PI;
                    for (; i > 0;) i -= 2 * Math.PI;
                    i = i / Math.PI / 2 * n;
                    var h = o - t + i - 2 * t;
                    c.push(["M", h, e]);
                    for (var l = 0, d = 0; d < u; ++d) {
                        var f = d % 4,
                            g = a.getWaterPositions(d * n / 4, f, n, r);
                        c.push(["C", g[0][0] + h, -g[0][1] + e, g[1][0] + h, -g[1][1] + e, g[2][0] + h, -g[2][1] + e]), d === u - 1 && (l = g[2][0])
                    }
                    return c.push(["L", l + h, s + t]), c.push(["L", h, s + t]), c.push(["L", h, e]), c
                }
            }), t.exports = a
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = function (t, e, n, i) {
                    var r = t.get("rootGroup"),
                        o = void 0,
                        a = void 0,
                        s = void 0,
                        u = void 0,
                        c = void 0;
                    t._on("mousedown", function (t) {
                        e && (t.shape || t.frontEvObj.shape) || (o = {
                            x: t.domX,
                            y: t.domY
                        }, a = r.getMatrix())
                    }), t._on("dragmove", function (e) {
                        o && (u = e.domX - o.x, c = e.domY - o.y, s = a.clone(), n === !1 && (u = 0), i === !1 && (c = 0), s.translate(u, c), t.updateMatrix(s), t.setCapture(!1), t.draw(!1))
                    }), t._on("dommouseleave", function () {
                        t.setCapture(!0), o = void 0, a = void 0, u = void 0, c = void 0, s = void 0
                    }), t._on("mouseup", function () {
                        t.setCapture(!0), o = void 0, a = void 0, u = void 0, c = void 0, s = void 0
                    })
                };
            i.dragCanvas = r, t.exports = r
        },
        function (t, e, n) {
            function i(t, e, n, i) {
                return {
                    x: Math.cos(i) * n + t,
                    y: Math.sin(i) * n + e
                }
            }

            function r(t, e, n, i) {
                var r, o;
                return i ? t < e ? (r = e - t, o = 2 * Math.PI - n + t) : t > n && (r = 2 * Math.PI - t + e, o = t - n) : (r = t - e, o = n - t), r > o ? n : e
            }

            function o(t, e, n, i) {
                var o = 0;
                return n - e >= 2 * Math.PI && (o = 2 * Math.PI), e = c.mod(e, 2 * Math.PI), n = c.mod(n, 2 * Math.PI) + o, t = c.mod(t, 2 * Math.PI), i ? e >= n ? t > n && t < e ? t : r(t, n, e, !0) : t < e || t > n ? t : r(t, e, n) : e <= n ? e < t && t < n ? t : r(t, e, n, !0) : t > e || t < n ? t : r(t, n, e)
            }

            function a(t, e, n, i, r, a, s, c, h) {
                var l = new u(s, c),
                    d = new u(t, e),
                    f = new u(1, 0),
                    g = u.sub(l, d),
                    p = f.angleTo(g);
                p = o(p, i, r, a);
                var v = new u(n * Math.cos(p) + t, n * Math.sin(p) + e);
                h && (h.x = v.x, h.y = v.y);
                var m = l.distanceTo(v);
                return m
            }

            function s(t, e, n, r, a, s) {
                var u = 0,
                    c = Math.PI / 2,
                    l = Math.PI,
                    d = 3 * Math.PI / 2,
                    f = [],
                    g = o(u, r, a, s);
                g === u && f.push(i(t, e, n, u)), g = o(c, r, a, s), g === c && f.push(i(t, e, n, c)), g = o(l, r, a, s), g === l && f.push(i(t, e, n, l)), g = o(d, r, a, s), g === d && f.push(i(t, e, n, d)), f.push(i(t, e, n, r)), f.push(i(t, e, n, a));
                var p = 1 / 0,
                    v = -(1 / 0),
                    m = 1 / 0,
                    x = -(1 / 0);
                return h.each(f, function (t) {
                    p > t.x && (p = t.x), v < t.x && (v = t.x), m > t.y && (m = t.y), x < t.y && (x = t.y)
                }), {
                    minX: p,
                    minY: m,
                    maxX: v,
                    maxY: x
                }
            }
            var u = n(4).Vector2,
                c = n(8),
                h = n(1);
            t.exports = {
                nearAngle: o,
                projectPoint: function (t, e, n, i, r, o, s, u) {
                    var c = {};
                    return a(t, e, n, i, r, o, s, u, c), c
                }, pointDistance: a,
                box: s
            }
        },
        function (t, e, n) {
            var i = n(4).Vector2;
            t.exports = {
                at: function (t, e, n) {
                    return (e - t) * n + t
                }, pointDistance: function (t, e, n, r, o, a) {
                    var s = new i(n - t, r - e);
                    if (s.isZero()) return NaN;
                    var u = s.vertical();
                    u.normalize();
                    var c = new i(o - t, a - e);
                    return Math.abs(c.dot(u))
                }, box: function (t, e, n, i, r) {
                    var o = r / 2,
                        a = Math.min(t, n),
                        s = Math.max(t, n),
                        u = Math.min(e, i),
                        c = Math.max(e, i);
                    return {
                        minX: a - o,
                        minY: u - o,
                        maxX: s + o,
                        maxY: c + o
                    }
                }, len: function (t, e, n, i) {
                    return Math.sqrt((n - t) * (n - t) + (i - e) * (i - e))
                }
            }
        },
        function (t, e, n) {
            function i(t, e, n, i) {
                var r = 1 - i;
                return r * (r * t + 2 * i * e) + i * i * n
            }

            function r(t, e, n, r, o, s, u, c, h) {
                var l, d, f, g, p, v, m, x = .005,
                    y = 1 / 0,
                    w = 1e-4,
                    b = new a(u, c);
                for (p = 0; p < 1; p += .05) f = new a(i(t, n, o, p), i(e, r, s, p)), d = f.distanceToSquared(b), d < y && (l = p, y = d);
                for (y = 1 / 0, m = 0; m < 32 && !(x < w); m++) {
                    var _ = l - x,
                        M = l + x;
                    f = new a(i(t, n, o, _), i(e, r, s, _)), d = f.distanceToSquared(b), _ >= 0 && d < y ? (l = _, y = d) : (g = new a(i(t, n, o, M), i(e, r, s, M)), v = g.distanceToSquared(b), M <= 1 && v < y ? (l = M, y = v) : x *= .5)
                }
                return h && (h.x = i(t, n, o, l), h.y = i(e, r, s, l)), Math.sqrt(y)
            }

            function o(t, e, n) {
                var i = t + n - 2 * e;
                if (s.equal(i, 0)) return [.5];
                var r = (t - e) / i;
                return r <= 1 && r >= 0 ? [r] : []
            }
            var a = n(4).Vector2,
                s = n(8);
            t.exports = {
                at: i,
                projectPoint: function (t, e, n, i, o, a, s, u) {
                    var c = {};
                    return r(t, e, n, i, o, a, s, u, c), c
                }, pointDistance: r,
                extrema: o
            }
        },
        function (t, e, n) {
            "use strict";
            var i = (n(1), "\t\n\v\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029"),
                r = new RegExp("([a-z])[" + i + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + i + "]*,?[" + i + "]*)+)", "ig"),
                o = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + i + "]*,?[" + i + "]*", "ig"),
                a = function (t) {
                    if (!t) return null;
                    if (typeof t == typeof []) return t;
                    var e = {
                            a: 7,
                            c: 6,
                            o: 2,
                            h: 1,
                            l: 2,
                            m: 2,
                            r: 4,
                            q: 4,
                            s: 4,
                            t: 2,
                            v: 1,
                            u: 3,
                            z: 0
                        },
                        n = [];
                    return String(t).replace(r, function (t, i, r) {
                        var a = [],
                            s = i.toLowerCase();
                        if (r.replace(o, function (t, e) {
                            e && a.push(+e)
                        }), "m" == s && a.length > 2 && (n.push([i].concat(a.splice(0, 2))), s = "l", i = "m" == i ? "l" : "L"), "o" == s && 1 == a.length && n.push([i, a[0]]), "r" == s) n.push([i].concat(a));
                        else
                            for (; a.length >= e[s] && (n.push([i].concat(a.splice(0, e[s]))), e[s]););
                    }), n
                },
                s = function (t, e) {
                    for (var n = [], i = 0, r = t.length; r - 2 * !e > i; i += 2) {
                        var o = [{
                            x: +t[i - 2],
                            y: +t[i - 1]
                        }, {
                            x: +t[i],
                            y: +t[i + 1]
                        }, {
                            x: +t[i + 2],
                            y: +t[i + 3]
                        }, {
                            x: +t[i + 4],
                            y: +t[i + 5]
                        }];
                        e ? i ? r - 4 == i ? o[3] = {
                            x: +t[0],
                            y: +t[1]
                        } : r - 2 == i && (o[2] = {
                            x: +t[0],
                            y: +t[1]
                        }, o[3] = {
                            x: +t[2],
                            y: +t[3]
                        }) : o[0] = {
                            x: +t[r - 2],
                            y: +t[r - 1]
                        } : r - 4 == i ? o[3] = o[2] : i || (o[0] = {
                            x: +t[i],
                            y: +t[i + 1]
                        }), n.push(["C", (-o[0].x + 6 * o[1].x + o[2].x) / 6, (-o[0].y + 6 * o[1].y + o[2].y) / 6, (o[1].x + 6 * o[2].x - o[3].x) / 6, (o[1].y + 6 * o[2].y - o[3].y) / 6, o[2].x, o[2].y])
                    }
                    return n
                },
                u = function (t, e, n, i, r) {
                    if (null == r && null == i && (i = n), t = +t, e = +e, n = +n, i = +i, null != r) var o = Math.PI / 180,
                        a = t + n * Math.cos(-i * o),
                        s = t + n * Math.cos(-r * o),
                        u = e + n * Math.sin(-i * o),
                        c = e + n * Math.sin(-r * o),
                        h = [
                            ["M", a, u],
                            ["A", n, n, 0, +(r - i > 180), 0, s, c]
                        ];
                    else h = [
                        ["M", t, e],
                        ["m", 0, -i],
                        ["a", n, i, 0, 1, 1, 0, 2 * i],
                        ["a", n, i, 0, 1, 1, 0, -2 * i],
                        ["z"]
                    ];
                    return h
                },
                c = function (t) {
                    if (t = a(t), !t || !t.length) return [
                        ["M", 0, 0]
                    ];
                    var e, n = [],
                        i = 0,
                        r = 0,
                        o = 0,
                        c = 0,
                        h = 0;
                    "M" == t[0][0] && (i = +t[0][1], r = +t[0][2], o = i, c = r, h++, n[0] = ["M", i, r]);
                    for (var l, d, f = 3 == t.length && "M" == t[0][0] && "R" == t[1][0].toUpperCase() && "Z" == t[2][0].toUpperCase(), g = h, p = t.length; g < p; g++) {
                        if (n.push(l = []), d = t[g], e = d[0], e != e.toUpperCase()) switch (l[0] = e.toUpperCase(), l[0]) {
                            case "A":
                                l[1] = d[1], l[2] = d[2], l[3] = d[3], l[4] = d[4], l[5] = d[5], l[6] = +d[6] + i, l[7] = +d[7] + r;
                                break;
                            case "V":
                                l[1] = +d[1] + r;
                                break;
                            case "H":
                                l[1] = +d[1] + i;
                                break;
                            case "R":
                                for (var v = [i, r].concat(d.slice(1)), m = 2, x = v.length; m < x; m++) v[m] = +v[m] + i, v[++m] = +v[m] + r;
                                n.pop(), n = n.concat(s(v, f));
                                break;
                            case "O":
                                n.pop(), v = u(i, r, d[1], d[2]), v.push(v[0]), n = n.concat(v);
                                break;
                            case "U":
                                n.pop(), n = n.concat(u(i, r, d[1], d[2], d[3])), l = ["U"].concat(n[n.length - 1].slice(-2));
                                break;
                            case "M":
                                o = +d[1] + i, c = +d[2] + r;
                            default:
                                for (m = 1, x = d.length; m < x; m++) l[m] = +d[m] + (m % 2 ? i : r)
                            } else if ("R" == e) v = [i, r].concat(d.slice(1)), n.pop(), n = n.concat(s(v, f)), l = ["R"].concat(d.slice(-2));
                            else if ("O" == e) n.pop(), v = u(i, r, d[1], d[2]), v.push(v[0]), n = n.concat(v);
                        else if ("U" == e) n.pop(), n = n.concat(u(i, r, d[1], d[2], d[3])), l = ["U"].concat(n[n.length - 1].slice(-2));
                        else
                            for (var y = 0, w = d.length; y < w; y++) l[y] = d[y]; if (e = e.toUpperCase(), "O" != e) switch (l[0]) {
                        case "Z":
                            i = +o, r = +c;
                            break;
                        case "H":
                            i = l[1];
                            break;
                        case "V":
                            r = l[1];
                            break;
                        case "M":
                            o = l[l.length - 2], c = l[l.length - 1];
                        default:
                            i = l[l.length - 2], r = l[l.length - 1]
                        }
                    }
                    return n
                },
                h = function (t, e, n, i) {
                    return [t, e, n, i, n, i]
                },
                l = function (t, e, n, i, r, o) {
                    var a = 1 / 3,
                        s = 2 / 3;
                    return [a * t + s * n, a * e + s * i, a * r + s * n, a * o + s * i, r, o]
                },
                d = function (t, e, n, i, r, o, a, s, u, c) {
                    n === i && (n += 1);
                    var h, l = 120 * Math.PI / 180,
                        f = Math.PI / 180 * (+r || 0),
                        g = [],
                        p = function (t, e, n) {
                            var i = t * Math.cos(n) - e * Math.sin(n),
                                r = t * Math.sin(n) + e * Math.cos(n);
                            return {
                                x: i,
                                y: r
                            }
                        };
                    if (c) S = c[0], A = c[1], _ = c[2], M = c[3];
                    else {
                        h = p(t, e, -f), t = h.x, e = h.y, h = p(s, u, -f), s = h.x, u = h.y, t === s && e === u && (s += 1, u += 1);
                        var v = (Math.cos(Math.PI / 180 * r), Math.sin(Math.PI / 180 * r), (t - s) / 2),
                            m = (e - u) / 2,
                            x = v * v / (n * n) + m * m / (i * i);
                        x > 1 && (x = Math.sqrt(x), n *= x, i *= x);
                        var y = n * n,
                            w = i * i,
                            b = (o == a ? -1 : 1) * Math.sqrt(Math.abs((y * w - y * m * m - w * v * v) / (y * m * m + w * v * v))),
                            _ = b * n * m / i + (t + s) / 2,
                            M = b * -i * v / n + (e + u) / 2,
                            S = Math.asin(((e - M) / i).toFixed(9)),
                            A = Math.asin(((u - M) / i).toFixed(9));
                        S = t < _ ? Math.PI - S : S, A = s < _ ? Math.PI - A : A, S < 0 && (S = 2 * Math.PI + S), A < 0 && (A = 2 * Math.PI + A), a && S > A && (S -= 2 * Math.PI), !a && A > S && (A -= 2 * Math.PI)
                    }
                    var P = A - S;
                    if (Math.abs(P) > l) {
                        var T = A,
                            E = s,
                            C = u;
                        A = S + l * (a && A > S ? 1 : -1), s = _ + n * Math.cos(A), u = M + i * Math.sin(A), g = d(s, u, n, i, r, 0, a, E, C, [A, T, _, M])
                    }
                    P = A - S;
                    var I = Math.cos(S),
                        k = Math.sin(S),
                        B = Math.cos(A),
                        F = Math.sin(A),
                        N = Math.tan(P / 4),
                        O = 4 / 3 * n * N,
                        R = 4 / 3 * i * N,
                        z = [t, e],
                        D = [t + O * k, e - R * I],
                        G = [s + O * F, u - R * B],
                        X = [s, u];
                    if (D[0] = 2 * z[0] - D[0], D[1] = 2 * z[1] - D[1], c) return [D, G, X].concat(g);
                    g = [D, G, X].concat(g).join().split(",");
                    for (var Y = [], j = 0, L = g.length; j < L; j++) Y[j] = j % 2 ? p(g[j - 1], g[j], f).y : p(g[j], g[j + 1], f).x;
                    return Y
                },
                f = function (t, e) {
                    for (var n = c(t), i = e && c(e), r = {
                        x: 0,
                        y: 0,
                        bx: 0,
                        by: 0,
                        X: 0,
                        Y: 0,
                        qx: null,
                        qy: null
                    }, o = {
                        x: 0,
                        y: 0,
                        bx: 0,
                        by: 0,
                        X: 0,
                        Y: 0,
                        qx: null,
                        qy: null
                    }, a = (function (t, e, n) {
                        var i, r;
                        if (!t) return ["C", e.x, e.y, e.x, e.y, e.x, e.y];
                        switch (!(t[0] in {
                            T: 1,
                            Q: 1
                        }) && (e.qx = e.qy = null), t[0]) {
                        case "M":
                            e.X = t[1], e.Y = t[2];
                            break;
                        case "A":
                            t = ["C"].concat(d.apply(0, [e.x, e.y].concat(t.slice(1))));
                            break;
                        case "S":
                            "C" == n || "S" == n ? (i = 2 * e.x - e.bx, r = 2 * e.y - e.by) : (i = e.x, r = e.y), t = ["C", i, r].concat(t.slice(1));
                            break;
                        case "T":
                            "Q" == n || "T" == n ? (e.qx = 2 * e.x - e.qx, e.qy = 2 * e.y - e.qy) : (e.qx = e.x, e.qy = e.y), t = ["C"].concat(l(e.x, e.y, e.qx, e.qy, t[1], t[2]));
                            break;
                        case "Q":
                            e.qx = t[1], e.qy = t[2], t = ["C"].concat(l(e.x, e.y, t[1], t[2], t[3], t[4]));
                            break;
                        case "L":
                            t = ["C"].concat(h(e.x, e.y, t[1], t[2]));
                            break;
                        case "H":
                            t = ["C"].concat(h(e.x, e.y, t[1], e.y));
                            break;
                        case "V":
                            t = ["C"].concat(h(e.x, e.y, e.x, t[1]));
                            break;
                        case "Z":
                            t = ["C"].concat(h(e.x, e.y, e.X, e.Y))
                        }
                        return t
                    }), s = function (t, e) {
                        if (t[e].length > 7) {
                            t[e].shift();
                            for (var r = t[e]; r.length;) f[e] = "A", i && (g[e] = "A"), t.splice(e++, 0, ["C"].concat(r.splice(0, 6)));
                            t.splice(e, 1), x = Math.max(n.length, i && i.length || 0)
                        }
                    }, u = function (t, e, r, o, a) {
                        t && e && "M" == t[a][0] && "M" != e[a][0] && (e.splice(a, 0, ["M", o.x, o.y]), r.bx = 0, r.by = 0, r.x = t[a][1], r.y = t[a][2], x = Math.max(n.length, i && i.length || 0))
                    }, f = [], g = [], p = "", v = "", m = 0, x = Math.max(n.length, i && i.length || 0); m < x; m++) {
                        n[m] && (p = n[m][0]), "C" != p && (f[m] = p, m && (v = f[m - 1])), n[m] = a(n[m], r, v), "A" != f[m] && "C" == p && (f[m] = "C"), s(n, m), i && (i[m] && (p = i[m][0]), "C" != p && (g[m] = p, m && (v = g[m - 1])), i[m] = a(i[m], o, v), "A" != g[m] && "C" == p && (g[m] = "C"), s(i, m)), u(n, i, r, o, m), u(i, n, o, r, m);
                        var y = n[m],
                            w = i && i[m],
                            b = y.length,
                            _ = i && w.length;
                        r.x = y[b - 2], r.y = y[b - 1], r.bx = parseFloat(y[b - 4]) || r.x, r.by = parseFloat(y[b - 3]) || r.y, o.bx = i && (parseFloat(w[_ - 4]) || o.x), o.by = i && (parseFloat(w[_ - 3]) || o.y), o.x = i && w[_ - 2], o.y = i && w[_ - 1]
                    }
                    return i ? [n, i] : n
                },
                g = /,?([a-z]),?/gi,
                p = function (t) {
                    return t.join(",").replace(g, "$1")
                },
                v = {
                    toArray: a,
                    toString: p,
                    toCurve: f,
                    toAbsolute: c,
                    catmullRomToBezier: s
                };
            t.exports = v
        },
        function (t, e, n) {
            "use strict";
            t.exports = {
                centerScaleIn: n(115),
                centerScaleOut: n(116),
                update: n(117),
                Util: n(25)
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(7),
                r = {
                    scaleIn: function (t, e, n, r, o) {
                        r = r ? r : e, o = o ? o : n, t.transform([
                            ["t", -r, -o],
                            ["s", .01, .01],
                            ["t", e, n]
                        ]), setTimeout(function () {
                            t && !t.get("destroyed") && t.animate({
                                transform: [
                                    ["t", -e, -n],
                                    ["s", 100, 100],
                                    ["t", r, o]
                                ]
                            }, i.enterDuration, i.enterEasing)
                        }, 16)
                    }, scaleOut: function (t, e, n) {
                        t.animate({
                            transform: [
                                ["t", -e, -n],
                                ["s", .01, .01],
                                ["t", e, n]
                            ]
                        }, i.leaveDuration, i.leaveEasing, function () {
                            t.remove()
                        })
                    }
                };
            t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(10).G,
                o = r.Group,
                a = function t(e) {
                    t.superclass.constructor.call(this, e)
                };
            i.extend(a, o), i.augment(a, {
                init: function () {
                    a.superclass.init.call(this), this.set("gid", this.get("id"))
                }, addShape: function (t, e) {
                    var n = this.get("id"),
                        i = a.superclass.addShape.call(this, t, e);
                    return i.set("id", n), i.set("gid", n + "-" + this.get("children").length), i
                }, addGroup: function (t, e) {
                    var n = this.get("id"),
                        i = a.superclass.addGroup.call(this, t, e);
                    return i.set("id", n), i.set("gid", n + this.get("children").length), i
                }
            }), t.exports = a
        },
        function (t, e, n) {
            "use strict";
            var i = n(11),
                r = n(3),
                o = n(132),
                a = n(28),
                s = n(63),
                u = n(7),
                c = n(24),
                h = function t(e) {
                    t.superclass.constructor.call(this, e), this._init()
                };
            h.ATTRS = {
                id: "",
                type: null,
                model: {},
                mapper: null,
                group: null,
                controlGroup: null,
                keyShape: null,
                class: null,
                drawFrameObj: {},
                enterAnimate: c.centerScaleIn,
                leaveAnimate: c.centerScaleOut
            }, r.extend(h, i), r.mixin(h, [o, a]), r.augment(h, {
                _init: function () {
                    var t = this,
                        e = t.get("type"),
                        n = s.getShape(e);
                    this.set("shapeManger", n)
                }, _calculateBBox: function () {
                    var t = this,
                        e = t.getKeyShape(),
                        n = e.get("parent"),
                        i = r.getBBox(e, n);
                    return this.set("boxStash", i), i
                }, _setAnimate: function () {
                    var t = this.get("group"),
                        e = this.getShapeObj(),
                        n = this.get("graph"),
                        i = this.get("enterAnimate"),
                        o = this.get("leaveAnimate");
                    if (n) {
                        var a = r.mix(!0, {}, {
                            enterAnimate: i,
                            leaveAnimate: o
                        }, {
                            enterAnimate: n.enterAnimate,
                            leaveAnimate: n.leaveAnimate
                        }, {
                            enterAnimate: e.enterAnimate,
                            leaveAnimate: e.leaveAnimate
                        });
                        t.set("enterAnimate", a.enterAnimate), t.set("leaveAnimate", a.leaveAnimate)
                    }
                }, hideControlPoints: function () {
                    var t = this.get("controlGroup");
                    t && t.remove()
                }, showControlPoints: function () {
                    var t = this,
                        e = t.getControlPoints(),
                        n = t.get("type"),
                        i = u[n + "ControlPointStyle"],
                        o = t.get("controlPointRootGroup"),
                        a = t.get("controlGroup");
                    if (a && a.remove(!0), a = o.addGroup({
                        zIndex: u.zIndex.controlPoint,
                        id: t.get("id")
                    }), t.set("controlGroup", a), i) {
                        var s = i.r ? i.r : 5;
                        r.each(e, function (e, n) {
                            a.addShape("rect", {
                                class: "control-point",
                                freezePoint: e,
                                pointIndex: n,
                                point: e,
                                item: t,
                                attrs: r.mix({}, i, {
                                    x: e.x - s,
                                    y: e.y - s,
                                    width: 2 * s,
                                    height: 2 * s
                                })
                            })
                        })
                    }
                }, isVisible: function () {
                    var t = this.getGroup();
                    return t.get("visible")
                }, _show: function () {
                    var t = this.get("group");
                    t.show()
                }, _hide: function () {
                    var t = this.get("group");
                    t.hide(), this.clearActived()
                }, getLabelShape: function () {
                    var t = this.get("group");
                    return t.findBy(function (t) {
                        return t.hasClass("label")
                    })
                }, getType: function () {
                    return this.get("type")
                }, getBBox: function () {
                    var t = this.get("boxStash");
                    return t || this._calculateBBox()
                }, getGroup: function () {
                    return this.get("group")
                }, getKeyShape: function () {
                    var t = this,
                        e = t.get("group"),
                        n = e.get("children"),
                        i = t.get("keyShape");
                    return i || n[0]
                }, getShapeObj: function () {
                    return this.get("shapeObj")
                }, getShapeCfg: function () {
                    return this.get("group").get("shapeCfg")
                }, update: function () {
                    var t = this.get("group"),
                        e = this.get("animate");
                    t.clear(!e), this.draw()
                }, draw: function () {
                    var t = this,
                        e = t.get("model"),
                        n = t.get("mapper"),
                        i = n.mapping(e),
                        o = t.get("group"),
                        a = t.get("shapeManger"),
                        s = void 0,
                        u = void 0,
                        c = void 0;
                    if (o.set("shapeCfg", i), t.beforeDraw(), s = i.shape, r.isArray(i.shape) && (s = i.shape[0]), s && s.startsWith && s.startsWith("http")) {
                        if (!i.size) return u = new Image, c = t.getCanvas(), u.src = i.shape, void(u.onload = function () {
                            return !(!t || t.get("destroyed")) && (e.size = [u.width, u.height], t.draw(), void c.draw())
                        });
                        s = "image"
                    }
                    var h = a.draw(s, i, o);
                    t.set("shapeObj", a.getShape(s)), t.set("keyShape", h), o.set("keyShape", h), t._setAnimate(), t.afterDraw()
                }, getCanvas: function () {
                    var t = this.get("group").get("canvas");
                    return t
                }, beforeDraw: function () {}, afterDraw: function () {
                    var t = this.get("graph"),
                        e = this.get("actived");
                    e && this.setActiveStatus(e), t.fire("afteritemrender", {
                        item: this
                    })
                }, destroyItem: function () {}, destroy: function () {
                    var t = this.get("group"),
                        e = this.get("controlGroup"),
                        n = this.get("delegateEl"),
                        i = this.get("animate");
                    t && t.remove(!i), e && e.remove(), n && n.remove(), this.destroyItem(), h.superclass.destroy.call(this)
                }, setActiveStatus: function (t, e, n) {
                    if (!this.destroyed) {
                        var i = this.getShapeObj();
                        i && r.isFunction(i.setActived) ? i.setActived(this, t) : t ? (this.showControlPoints(), e && e()) : (this.hideControlPoints(), n && n())
                    }
                }, showDelegation: function (t) {
                    var e = this.getDelegationPath(t),
                        n = this.get("delegateEl"),
                        i = t.stroke,
                        o = this.get("delegaRootGroup"),
                        a = this.get("type"),
                        s = r.mix(!0, {}, u[a + "DelegationStyle"], {
                            path: e,
                            stroke: i
                        });
                    n ? n.attr(s) : (n = o.addShape("path", {
                        attrs: s,
                        capture: !1,
                        zIndex: u.zIndex.delegate
                    }), this.set("delegateEl", n))
                }, getModel: function () {
                    return this.get("model")
                }, updateModel: function (t) {
                    var e = this.getModel();
                    r.mix(e, t)
                }, getControlPoints: function () {}, getDelegationPath: function () {}, hideDelegation: function () {
                    var t = this.get("delegateEl");
                    t && t.remove(), this.set("delegateEl", null)
                }, style: function (t) {
                    var e = this.get("group");
                    r.traverseTree(e, function (e) {
                        e.attr(t)
                    })
                }
            }), t.exports = h
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = function () {};
            i.augment(r, {
                hasClass: function (t) {
                    var e = this.get("class");
                    return !(!e || e.indexOf(t) === -1)
                }
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";

            function i(t, e, n) {
                return n ? t.getShape(n) : t.getShape(e)
            }
            var r = n(1),
                o = {},
                a = {
                    defaultShapeType: null,
                    getShape: function (t) {
                        var e = this,
                            n = e[t] || e[e.defaultShapeType] || o.ShapeBase;
                        return n
                    }, draw: function (t, e, n) {
                        var i = this.getShape(t),
                            o = i.style(e);
                        o && (r.isObject(e.style) ? e.style = r.mix({}, o, e.style) : e.style = o);
                        var a = i.draw(e, n);
                        return i.afterDraw(e, n, a), a
                    }
                },
                s = {
                    afterDraw: function () {}, draw: function () {}, style: function () {}
                };
            o.registGeom = function (t, e) {
                var n = r.ucfirst(t),
                    i = r.mix({}, a, e);
                return o[n] = i, i.className = n, i
            }, o.registNode = function (t, e, n) {
                var a = o.Node,
                    s = i(a, t, n),
                    u = r.mix({}, s, e);
                return a[t] = u, u
            }, o.registEdge = function (t, e, n) {
                var a = o.Edge,
                    s = i(a, t, n),
                    u = r.mix({}, s, e);
                return a[t] = u, u
            }, o.getShape = function (t) {
                var e = this;
                return t = r.ucfirst(t), e[t] || o.ShapeBase
            }, o.GeomShape = a, o.ShapeBase = s, t.exports = o
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = {};
            i.mix(r, {
                traverseTree: function (t, e) {
                    var n = t.get("children");
                    i.each(n, function (n) {
                        e(n, t), n.get("children") && i.traverseTree(n, e)
                    })
                }, isNode: function (t) {
                    return t && i.isObject(t) && "node" === t.get("type")
                }, isEdge: function (t) {
                    return t && i.isObject(t) && "edge" === t.get("type")
                }, objectToValues: function (t) {
                    var e = [],
                        n = void 0;
                    for (n in t) t.hasOwnProperty(n) && e.push(t[n]);
                    return e
                }, frameDraw: function (t) {
                    function e() {
                        t.animateHandler = i.requestAnimationFrame(function () {
                            try {
                                t.callback()
                            } catch (t) {
                                console.warn(t)
                            }
                            t.animateHandler = void 0
                        })
                    }
                    void 0 === t.animateHandler && e()
                }, drawLabel: function (t, e, n) {
                    return t.addShape("text", {
                        attrs: e,
                        class: "label",
                        zIndex: n,
                        freezePoint: {
                            x: e.x,
                            y: e.y
                        }
                    })
                }, getNineBoxPosition: function (t, e, n, i, r) {
                    var o = {};
                    switch (t) {
                    case "tl":
                        o.y = r[0], o.x = r[3];
                        break;
                    case "lc":
                        o.y = (e.height - i) / 2, o.x = r[3];
                        break;
                    case "bl":
                        o.y = e.height - i - r[2], o.x = r[3];
                        break;
                    case "cc":
                        o.y = (e.height - i) / 2, o.x = (e.width - n) / 2;
                        break;
                    case "tc":
                        o.y = r[0], o.x = (e.width - n) / 2;
                        break;
                    case "tr":
                        o.y = r[0], o.x = e.width - n - r[1];
                        break;
                    case "rc":
                        o.y = (e.height - i) / 2, o.x = e.width - n - r[1];
                        break;
                    case "br":
                        o.y = e.height - i - r[2], o.x = e.width - n - r[1];
                        break;
                    case "bc":
                        o.y = e.height - i - r[2], o.x = (e.width - n) / 2;
                        break;
                    default:
                        o.y = e.minX + r[0], o.x = e.minY + r[3]
                    }
                    return o.x += e.x, o.y += e.y, o
                }
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(8),
                o = n(4),
                a = o.Vector2,
                s = o.Vector3,
                u = 2,
                c = .001;
            i.mix(r, {
                getpointInRectQuadrant: function (t, e) {
                    var n = new a(t.maxX - t.minX, t.minY - t.maxY),
                        i = new a(t.maxX - t.minX, t.maxY - t.minY),
                        o = new a(t.minX - t.maxX, t.maxY - t.minY),
                        s = new a(t.minX - t.maxX, t.minY - t.maxY),
                        u = new a(e.x - (t.minX + t.maxX) / 2, e.y - (t.minY + t.maxY) / 2);
                    return r.getVectorAngle(u, i) < r.getVectorAngle(o, i) ? 2 : r.getVectorAngle(u, n) < r.getVectorAngle(i, n) ? 1 : r.getVectorAngle(u, s) < r.getVectorAngle(n, s) ? 0 : r.getVectorAngle(u, o) < r.getVectorAngle(s, o) ? 3 : void 0
                }, getVectorAngle: function (t, e) {
                    var n = t.angleTo(e, !0);
                    return n
                }, isBetween: function (t, e, n) {
                    return t >= e && t <= n
                }, applyPoints: function (t, e, n) {
                    var o = [];
                    return i.each(t, function (t) {
                        o.push(r.applyPoint(t, e, n))
                    }), o
                }, applyPoint: function (t, e, n) {
                    var i = new s(t.x, t.y, 1);
                    return e.apply(i, n), t.x = i.x, t.y = i.y, t
                }, getBBox: function (t, e) {
                    e = e ? e : t;
                    var n = t.getBBox(),
                        i = r.applyPoint({
                            x: n.minX,
                            y: n.minY
                        }, t, e),
                        o = r.applyPoint({
                            x: n.maxX,
                            y: n.maxY
                        }, t, e),
                        a = r.applyPoint({
                            x: n.maxX,
                            y: n.minY
                        }, t, e),
                        s = r.applyPoint({
                            x: n.minX,
                            y: n.maxY
                        }, t, e),
                        u = Math.min(i.x, o.x, a.x, s.x),
                        c = Math.min(i.y, o.y, a.y, s.y),
                        h = Math.max(i.x, o.x, a.x, s.x),
                        l = Math.max(i.y, o.y, a.y, s.y),
                        d = {
                            minX: u,
                            minY: c,
                            x: u,
                            y: c,
                            maxX: h,
                            maxY: l,
                            centerX: (h + u) / 2,
                            centerY: (l + c) / 2,
                            width: h - u,
                            height: l - c
                        };
                    return d
                }, radixSort: function (t, e) {
                    var n = 10,
                        i = 1,
                        r = [],
                        o = 1,
                        a = void 0,
                        s = void 0,
                        u = void 0,
                        c = void 0,
                        h = void 0,
                        l = void 0,
                        d = void 0;
                    for (u = 0; u < t.length; u++) a = e(t[u]), a = parseInt(a, 10), s = a.toString().length, a.toString().length > o && (o = s);
                    for (u = 0; u < o; u++, i *= 10, n *= 10) {
                        for (c = 0; c < t.length; c++) h = e(t[c]), h = parseInt(h % n / i, 10), void 0 === r[h] && (r[h] = []), r[h].push(t[c]);
                        for (l = 0, c = 0; c < r.length; c++)
                            if (d = void 0, void 0 !== r[c])
                                for (d = r[c].shift(); void 0 !== d;) t[l++] = d, d = r[c].shift()
                    }
                    return t
                }, scaleMatrix: function (t, e, n) {
                    e && n.translate(-e.x, -e.y), n.scale(t, t), e && n.translate(e.x, e.y);
                }, invertPoint: function (t, e, n) {
                    return e = e.getInverse(), r.converPoint(t, e, n)
                }, converPoint: function (t, e, n) {
                    void 0 === n && (n = 1);
                    var i = new s(t.x, t.y, n);
                    return i.applyMatrix(e), {
                        x: i.x,
                        y: i.y
                    }
                }, getCircleIntersect: function (t, e, n, i, r) {
                    var o = Math.sqrt(Math.pow(t - n, 2) + Math.pow(e - i, 2));
                    if (o < r) return null;
                    var a = t - n,
                        s = e - i,
                        u = Math.sign(a),
                        c = Math.sign(s),
                        h = Math.atan(s / a);
                    return {
                        x: n + Math.abs(r * Math.cos(h)) * u,
                        y: i + Math.abs(r * Math.sin(h)) * c
                    }
                }, getRectIntersect: function (t, e) {
                    var n = t.x,
                        i = t.y,
                        o = t.width,
                        a = t.height,
                        s = n + o / 2,
                        u = i + a / 2,
                        c = [],
                        h = {
                            x: s,
                            y: u
                        };
                    c.push({
                        x: n,
                        y: i
                    }), c.push({
                        x: n + o,
                        y: i
                    }), c.push({
                        x: n + o,
                        y: i + a
                    }), c.push({
                        x: n,
                        y: i + a
                    }), c.push({
                        x: n,
                        y: i
                    });
                    for (var l = null, d = 1; d < c.length && !(l = r.getLineIntersect(c[d - 1], c[d], h, e)); d++);
                    return l
                }, getLineIntersect: function (t, e, n, i) {
                    var o = r.vector(t, n),
                        a = r.vector(t, e),
                        s = r.vector(n, i),
                        u = a.x * s.y - a.y * s.x,
                        h = u * u,
                        l = a.x * a.x + a.y * a.y,
                        d = s.x * s.x + s.y * s.y,
                        f = null;
                    if (h > c * l * d) {
                        var g = (o.x * s.y - o.y * s.x) / u,
                            p = (o.x * a.y - o.y * a.x) / u;
                        r.isBetween(g, 0, 1) && r.isBetween(p, 0, 1) && (f = {
                            x: t.x + g * a.x,
                            y: t.y + g * a.y
                        })
                    }
                    return f
                }, getSnapPoint: function (t, e) {
                    for (var n = r.distance(t[0], e, !1), i = t[0], o = 1; o < t.length; o++) {
                        var a = t[o],
                            s = r.distance(a, e, !1);
                        s < n && (i = a, n = s)
                    }
                    return i
                }, distance: function (t, e, n) {
                    var i = (e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y);
                    return n === !1 ? i : Math.sqrt(i)
                }, isInRect: function (t, e, n, i, r) {
                    return t.x < i && t.x > e && t.y < r && t.y > n
                }, isInSegment: function (t, e, n) {
                    if (!t || !e || !n) return !1;
                    var i = r.segmentDistance(t, e, n);
                    return i !== 1 / 0 && i < u
                }, segmentDistance: function (t, e, n) {
                    var i = r.vector(t, n),
                        o = r.vector(e, n),
                        a = r.vector(t, e),
                        s = i.angle(a),
                        u = o.angle(a);
                    if (s = s - Math.PI / 2 > 0 ? 1 : 0, u = u - Math.PI / 2 > 0 ? 1 : 0, s === u) return 1 / 0;
                    var c = a.angle(i),
                        h = a.length();
                    return Math.abs(h * Math.sin(c))
                }, vector: function (t, e) {
                    return new a(e.x - t.x, e.y - t.y)
                }, guid: function () {
                    return "xxxxxxxx".replace(/[xy]/g, function (t) {
                        var e = 16 * Math.random() | 0,
                            n = "x" === t ? e : 3 & e | 8;
                        return n.toString(16)
                    })
                }
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(180),
                r = n(189),
                o = n(74),
                a = n(73),
                s = i[0];
            t.exports = function (t, e, n) {
                var u = e.direction || s;
                if (e.isHorizontal = r(u), u && i.indexOf(u) === -1) throw new TypeError("Invalid direction: " + u);
                if (u === i[0]) n(t, e), o(t, "L", "R", e);
                else if (u === i[1]) n(t, e), t.right2left(), o(t, "R", "L", e);
                else if (u === i[2]) n(t, e), o(t, "T", "B", e);
                else if (u === i[3]) n(t, e), t.bottom2top(), o(t, "B", "T", e);
                else if (u === i[4] || u === i[5]) {
                    var c = a(t, e),
                        h = c.left,
                        l = c.right;
                    n(h, e), n(l, e), e.isHorizontal ? (o(h, "R", "L", e), o(l, "L", "R", e)) : (o(h, "B", "T", e), o(l, "T", "B", e)), e.isHorizontal ? h.right2left() : h.bottom2top(), l.translate(h.x - l.x, h.y - l.y), t.x = h.x, t.y = l.y, o(t, "C", "C", e, !0);
                    var d = t.getBoundingBox();
                    e.isHorizontal ? d.top < 0 && t.translate(0, -d.top) : d.left < 0 && t.translate(-d.left, 0)
                }
                return t.translate(-(t.x + t.width / 2 + t.hgap), -(t.y + t.height / 2 + t.vgap)), t.eachNode(function (t) {
                    var e = t.data;
                    e.x = t.x + t.width / 2 + t.hgap, e.y = t.y + t.height / 2 + t.vgap, e.align = t.align, e.inAnchor = t.inAnchor ? [t.inAnchor.x, t.inAnchor.y] : null, e.outAnchor = t.outAnchor ? [t.outAnchor.x, t.outAnchor.y] : null
                }), t
            }
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }
            var r = n(182),
                o = 2 * r,
                a = r,
                s = {
                    getId: function (t) {
                        return t.id || t.name
                    }, getHGap: function (t) {
                        return t.hgap || a
                    }, getVGap: function (t) {
                        return t.vgap || a
                    }, getChildren: function (t) {
                        return t.children
                    }, getHeight: function (t) {
                        return t.height || o
                    }, getWidth: function (t) {
                        var e = t.name || " ";
                        return t.width || e.split("").length * r
                    }
                },
                u = function () {
                    function t(e) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            r = arguments[2];
                        i(this, t);
                        var o = this;
                        if (o.vgap = o.hgap = 0, e instanceof t) return e;
                        o.data = e;
                        var a = (n.getHGap || s.getHGap)(e),
                            u = (n.getVGap || s.getVGap)(e);
                        if (o.width = (n.getWidth || s.getWidth)(e), o.height = (n.getHeight || s.getHeight)(e), o.id = (n.getId || s.getId)(e), o.x = o.y = 0, o.inAnchor = {
                            x: 0,
                            y: .5
                        }, o.outAnchor = {
                            x: 1,
                            y: .5
                        }, o.depth = 0, !r && !e.isCollapsed)
                            for (var c = [o], h = c.pop(); h;) {
                                if (!h.data.isCollapsed) {
                                    var l = (n.getChildren || s.getChildren)(h.data),
                                        d = l ? l.length : 0;
                                    if (h.children = [], l && d)
                                        for (var f = 0; f < d; f++) {
                                            var g = new t(l[f], n);
                                            h.children.push(g), c.push(g), g.parent = h, g.depth = h.depth + 1
                                        }
                                }
                                h = c.pop()
                            }
                        o.children || (o.children = []), o.addGap(a, u)
                    }
                    return t.prototype.isRoot = function () {
                        return 0 === this.depth
                    }, t.prototype.isLeaf = function () {
                        return 0 === this.children.length
                    }, t.prototype.addGap = function (t, e) {
                        var n = this;
                        n.hgap += t, n.vgap += e, n.width += 2 * t, n.height += 2 * e
                    }, t.prototype.eachNode = function (t) {
                        for (var e = this, n = [e], i = n.pop(); i;) t(i), n = n.concat(i.children), i = n.pop()
                    }, t.prototype.DFTraverse = function (t) {
                        this.eachNode(t)
                    }, t.prototype.BFTraverse = function (t) {
                        for (var e = this, n = [e], i = n.shift(); i;) t(i), n = n.concat(i.children), i = n.shift()
                    }, t.prototype.getBoundingBox = function () {
                        var t = {
                            left: Number.MAX_VALUE,
                            top: Number.MAX_VALUE,
                            width: 0,
                            height: 0
                        };
                        return this.eachNode(function (e) {
                            t.left = Math.min(t.left, e.x), t.top = Math.min(t.top, e.y), t.width = Math.max(t.width, e.x + e.width), t.height = Math.max(t.height, e.y + e.height)
                        }), t
                    }, t.prototype.translate = function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                        this.eachNode(function (n) {
                            n.x += t, n.y += e
                        })
                    }, t.prototype.right2left = function () {
                        var t = this,
                            e = t.getBoundingBox();
                        t.eachNode(function (t) {
                            t.x = t.x - 2 * (t.x - e.left) - t.width
                        }), t.translate(e.width, 0)
                    }, t.prototype.bottom2top = function () {
                        var t = this,
                            e = t.getBoundingBox();
                        t.eachNode(function (t) {
                            t.y = t.y - 2 * (t.y - e.top) - t.height
                        }), t.translate(0, e.height)
                    }, t.prototype.getCenterX = function () {
                        var t = this;
                        return t.x + t.width / 2
                    }, t.prototype.getCenterY = function () {
                        var t = this;
                        return t.y + t.height / 2
                    }, t.prototype.getActualWidth = function () {
                        var t = this;
                        return t.width - 2 * t.hgap
                    }, t.prototype.getActualHeight = function () {
                        var t = this;
                        return t.height - 2 * t.vgap
                    }, t.prototype.getAnchorPoint = function (t) {
                        var e = this,
                            n = e.getActualWidth(),
                            i = e.getActualHeight();
                        return {
                            x: e.x + e.hgap + n * t.x,
                            y: e.y + e.vgap + i * t.y
                        }
                    }, t
                }();
            t.exports = u
        },
        function (t, e) {
            "use strict";

            function n() {
                var t = document.createElement("i");
                return t.title = "Web Colour Picker", t.style.display = "none", document.body.appendChild(t), t
            }
            var i = /rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/,
                r = {},
                o = null;
            t.exports = {
                toRGB: function (t) {
                    o || (o = n());
                    var e;
                    if (r[t]) e = r[t];
                    else {
                        o.style.color = t, e = document.defaultView.getComputedStyle(o, "").getPropertyValue("color");
                        var a = i.exec(e);
                        a.shift(), e = this.arr2rgb(a), r[t] = e
                    }
                    return e
                }, toHex: function (t) {
                    return t = Math.round(t), t = t.toString(16), 1 === t.length && (t = "0" + t), t
                }, hsl2Rgb: function (t) {
                    var e = t[0],
                        n = t[1],
                        i = t[2],
                        r = {};
                    if (0 === n) r.r = r.g = r.b = i;
                    else {
                        var o = function (t, e, n) {
                                return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < .5 ? e : n < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - n) : t
                            },
                            a = i <= .5 ? i * (1 + n) : i + n - i * n,
                            s = 2 * i - a;
                        r.r = o(s, a, e + 1 / 3), r.g = o(s, a, e), r.b = o(s, a, e - 1 / 3)
                    }
                    return r.r = Math.min(Math.round(255 * r.r), 255), r.g = Math.min(Math.round(255 * r.g), 255), r.b = Math.min(Math.round(255 * r.b), 255), "#" + this.toHex(r.r) + this.toHex(r.g) + this.toHex(r.b)
                }, rgb2hsl: function (t) {
                    var e, n, i, r = this.rgb2arr(t),
                        o = r[0] / 255,
                        a = r[1] / 255,
                        s = r[2] / 255,
                        u = Math.min(o, a, s),
                        c = Math.max(o, a, s),
                        h = c - u;
                    return c === u ? e = 0 : o === c ? e = (a - s) / h : a === c ? e = 2 + (s - o) / h : s === c && (e = 4 + (o - a) / h), e = Math.min(60 * e, 360), e < 0 && (e += 360), i = (u + c) / 2, n = c === u ? 0 : i <= .5 ? h / (c + u) : h / (2 - c - u), [e / 360, n, i]
                }, arr2rgb: function (t) {
                    return "#" + this.toHex(t[0]) + this.toHex(t[1]) + this.toHex(t[2])
                }, rgb2arr: function (t) {
                    var e = [];
                    return e.push(parseInt(t.substr(1, 2), 16)), e.push(parseInt(t.substr(3, 2), 16)), e.push(parseInt(t.substr(5, 2), 16)), e
                }
            }
        },
        function (t, e) {
            t.exports = {
                prefix: "g",
                backupContext: document.createElement("canvas").getContext("2d"),
                debug: !1,
                warn: function () {}
            }
        },
        function (t, e, n) {
            var i = n(1),
                r = n(85),
                o = n(86),
                a = n(84),
                s = n(37),
                u = n(81),
                c = ["fillStyle", "font", "globalAlpha", "lineCap", "lineWidth", "lineJoin", "miterLimit", "shadowBlur", "shadowColor", "shadowOffsetX", "shadowOffsetY", "strokeStyle", "textAlign", "textBaseline", "lineDash"],
                h = function (t) {
                    this.__cfg = {
                        zIndex: 0,
                        capture: !0,
                        visible: !0,
                        destroyed: !1
                    }, i.simpleMix(this.__cfg, this.getDefaultCfg(), t), this.initAttrs(this.__cfg.attrs), this.initTransform(), this.initEventDispatcher(), this.init()
                };
            h.CFG = {
                id: null,
                zIndex: 0,
                canvas: null,
                parent: null,
                capture: !0,
                context: null,
                visible: !0,
                destroyed: !1
            }, i.augment(h, r, u, o, a, {
                init: function () {
                    this.setSilent("animable", !0);
                    var t = this.__attrs;
                    t && t.rotate && this.rotateAtStart(t.rotate)
                }, getParent: function () {
                    return this.get("parent")
                }, getDefaultCfg: function () {
                    return {}
                }, set: function (t, e) {
                    var n = "__set" + i.ucfirst(t);
                    return this[n] && (e = this[n](e)), this.__cfg[t] = e, this
                }, setSilent: function (t, e) {
                    this.__cfg[t] = e
                }, get: function (t) {
                    return this.__cfg[t]
                }, draw: function (t) {
                    this.get("destroyed") || this.get("visible") && (this.setContext(t), this.drawInner(t), this.restoreContext(t))
                }, setContext: function (t) {
                    var e = this.__attrs.clip;
                    t.save(), e && (e.resetTransform(t), e.createPath(t), t.clip()), this.resetContext(t), this.resetTransform(t)
                }, restoreContext: function (t) {
                    t.restore()
                }, resetContext: function (t) {
                    var e = this.__attrs;
                    if (!this.isGroup)
                        for (var n in e)
                            if (c.indexOf(n) > -1) {
                                var r = e[n];
                                "fillStyle" === n && (r = s.parseStyle(r, this)), "strokeStyle" === n && (r = s.parseStyle(r, this)), "lineDash" === n && t.setLineDash ? i.isArray(r) ? t.setLineDash(r) : i.isString(r) && t.setLineDash(r.split(" ")) : t[n] = r
                            }
                }, drawInner: function () {}, show: function () {
                    return this.set("visible", !0), this
                }, hide: function () {
                    return this.set("visible", !1), this
                }, remove: function (t) {
                    if (void 0 === t && (t = !0), this.get("parent")) {
                        var e = this.get("parent"),
                            n = e.get("children");
                        i.remove(n, this)
                    }
                    return t && this.destroy(), this
                }, destroy: function () {
                    var t = this.get("destroyed");
                    t || (this.__cfg = {}, this.__attrs = null, this.__listeners = null, this.__m = null, this.set("destroyed", !0))
                }, __setZIndex: function (t) {
                    return this.__cfg.zIndex = t, i.notNull(this.get("parent")) && this.get("parent").sort(), t
                }, __setAttrs: function (t) {
                    return this.attr(t), t
                }, clone: function () {
                    return i.clone(this)
                }, getBBox: function () {
                    return {
                        minX: 0,
                        maxX: 0,
                        minY: 0,
                        maxY: 0
                    }
                }
            }), t.exports = h
        },
        function (t, e, n) {
            function i(t, e) {
                if (void 0 === e) return t;
                t = new h(t), t.multiplyA(e);
                var n = t.getType();
                return "hsl" === n ? t.getHSLStyle() : "rgb" === n ? t.getRGBStyle() : void 0
            }

            function r(t, e, n) {
                var r = t.match(v);
                u.each(r, function (t) {
                    t = t.split(":");
                    var r = i(t[1], n);
                    e.addColorStop(t[0], r)
                })
            }

            function o(t, e, n) {
                var i, o, a = f.exec(t),
                    s = c.mod(c.degreeToRad(parseFloat(a[1])), 2 * Math.PI),
                    u = a[2],
                    h = e.getBBox();
                s >= 0 && s < .5 * Math.PI ? (i = {
                    x: h.minX,
                    y: h.minY
                }, o = {
                    x: h.maxX,
                    y: h.maxY
                }) : .5 * Math.PI <= s && s < Math.PI ? (i = {
                    x: h.maxX,
                    y: h.minY
                }, o = {
                    x: h.minX,
                    y: h.maxY
                }) : Math.PI <= s && s < 1.5 * Math.PI ? (i = {
                    x: h.maxX,
                    y: h.maxY
                }, o = {
                    x: h.minX,
                    y: h.minY
                }) : (i = {
                    x: h.minX,
                    y: h.maxY
                }, o = {
                    x: h.maxX,
                    y: h.minY
                });
                var l = Math.tan(s),
                    d = l * l,
                    g = (o.x - i.x + l * (o.y - i.y)) / (d + 1) + i.x,
                    p = l * (o.x - i.x + l * (o.y - i.y)) / (d + 1) + i.y,
                    v = e.get("context"),
                    m = v.createLinearGradient(i.x, i.y, g, p);
                return r(u, m, n), m
            }

            function a(t, e, n) {
                var i = g.exec(t),
                    o = parseFloat(i[1]),
                    a = parseFloat(i[2]),
                    s = parseFloat(i[3]),
                    u = i[4],
                    c = e.getBBox(),
                    h = e.get("context"),
                    l = c.maxX - c.minX,
                    d = c.maxY - c.minY,
                    f = Math.sqrt(l * l + d * d) / 2,
                    p = h.createRadialGradient(c.minX + l * o, c.minY + d * a, s, c.minX + l / 2, c.minY + d / 2, f);
                return r(u, p, n), p
            }

            function s(t, e) {
                var n = p.exec(t),
                    i = n[1],
                    r = n[2];
                switch (i) {
                case "a":
                    i = "repeat";
                    break;
                case "x":
                    i = "repeat-x";
                    break;
                case "y":
                    i = "repeat-y";
                    break;
                case "n":
                    i = "no-repeat";
                    break;
                default:
                    i = "no-repeat"
                }
                var o = document.getElementById(r),
                    a = e.get("context"),
                    s = a.createPattern(o, i);
                return s
            }
            var u = n(1),
                c = n(8),
                h = n(16),
                l = /[MLHVQTCSAZ]([^MLHVQTCSAZ]*)/gi,
                d = /[^\s\,]+/gi,
                f = /^l\s*\(\s*([\d.]+)\s*\)\s*(.*)/i,
                g = /^r\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)\s*(.*)/i,
                p = /^p\s*([axyn])\s+(.*)/i,
                v = /[\d.]+:(#[^\s]+|[^\)]+\))/gi,
                m = {};
            t.exports = {
                parsePath: function (t) {
                    return t = t || [], u.isArray(t) ? t : u.isString(t) ? (t = t.match(l), u.each(t, function (e, n) {
                        if (e = e.match(d), e[0].length > 1) {
                            var i = e[0].charAt(0);
                            e.splice(1, 0, e[0].substr(1)), e[0] = i
                        }
                        u.each(e, function (t, n) {
                            isNaN(t) || (e[n] = +t)
                        }), t[n] = e
                    }), t) : void 0
                }, parseStyle: function (t, e, n) {
                    if (u.isString(t)) {
                        if ("(" === t[1] || "(" === t[2]) {
                            if ("l" === t[0]) return o(t, e, n);
                            if ("r" === t[0]) return a(t, e, n);
                            if ("p" === t[0]) return s(t, e)
                        }
                        return u.isNull(n) ? t : i(t, n)
                    }
                }, numberToColor: function (t) {
                    var e = m[t];
                    if (!e) {
                        for (var n = t.toString(16), i = n.length; i < 6; i++) n = "0" + n;
                        e = "#" + n, m[t] = e
                    }
                    return e
                }
            }
        },
        function (t, e, n) {
            var i = n(35),
                r = {
                    Group: n(83),
                    Shape: n(5),
                    Rect: n(52),
                    Circle: n(40),
                    Ellipse: n(42),
                    Path: n(48),
                    Text: n(53),
                    Line: n(46),
                    Image: n(44),
                    Polygon: n(49),
                    Polyline: n(50),
                    Arc: n(39),
                    Fan: n(43),
                    Cubic: n(41),
                    Quadratic: n(51),
                    Marker: n(47),
                    debug: function (t) {
                        i.debug = t
                    }
                };
            t.exports = r
        },
        function (t, e, n) {
            var i = n(1),
                r = n(4).Vector2,
                o = n(5),
                a = n(6),
                s = n(20),
                u = n(12),
                c = function (t) {
                    c.superclass.constructor.call(this, t)
                };
            c.ATTRS = {
                x: 0,
                y: 0,
                r: 0,
                startAngle: 0,
                endAngle: 0,
                clockwise: !1,
                lineWidth: 1,
                arrow: !1
            }, i.extend(c, o), i.augment(c, {
                canStroke: !0,
                type: "arc",
                getDefaultAttrs: function () {
                    return {
                        x: 0,
                        y: 0,
                        r: 0,
                        startAngle: 0,
                        endAngle: 0,
                        clockwise: !1,
                        lineWidth: 1,
                        arrow: !1
                    }
                }, calculateBox: function () {
                    var t = this.__attrs,
                        e = t.x,
                        n = t.y,
                        i = t.r,
                        r = t.startAngle,
                        o = t.endAngle,
                        a = t.clockwise,
                        u = t.lineWidth,
                        c = u / 2,
                        h = s.box(e, n, i, r, o, a);
                    return h.minX -= c, h.minY -= c, h.maxX += c, h.maxY += c, h
                }, isPointInPath: function (t, e) {
                    var n = this.__attrs,
                        i = n.x,
                        r = n.y,
                        o = n.r,
                        s = n.startAngle,
                        u = n.endAngle,
                        c = n.clockwise,
                        h = n.lineWidth;
                    return !!this.hasStroke() && a.arcline(i, r, o, s, u, c, h, t, e)
                }, createPath: function (t) {
                    var e = this.__attrs,
                        n = e.x,
                        i = e.y,
                        o = e.r,
                        a = e.startAngle,
                        s = e.endAngle,
                        c = e.clockwise,
                        h = e.lineWidth,
                        l = e.arrow;
                    if (t = t || self.get("context"), t.beginPath(), t.arc(n, i, o, a, s, c), l) {
                        var d = {
                                x: n + o * Math.cos(s),
                                y: i + o * Math.sin(s)
                            },
                            f = new r(-o * Math.sin(s), o * Math.cos(s));
                        c && f.multiplyScaler(-1), u.makeArrow(t, f, d, h)
                    }
                }
            }), t.exports = c
        },
        function (t, e, n) {
            var i = n(1),
                r = n(5),
                o = n(6),
                a = function (t) {
                    a.superclass.constructor.call(this, t)
                };
            a.ATTRS = {
                x: 0,
                y: 0,
                r: 0,
                lineWidth: 1
            }, i.extend(a, r), i.augment(a, {
                canFill: !0,
                canStroke: !0,
                type: "circle",
                getDefaultAttrs: function () {
                    return {
                        lineWidth: 1
                    }
                }, calculateBox: function () {
                    var t = this.__attrs,
                        e = t.x,
                        n = t.y,
                        i = t.r,
                        r = t.lineWidth,
                        o = r / 2 + i;
                    return {
                        minX: e - o,
                        minY: n - o,
                        maxX: e + o,
                        maxY: n + o
                    }
                }, isPointInPath: function (t, e) {
                    var n = this.hasFill(),
                        i = this.hasStroke();
                    return n && i ? this.__isPointInFill(t, e) || this.__isPointInStroke(t, e) : n ? this.__isPointInFill(t, e) : !!i && this.__isPointInStroke(t, e)
                }, __isPointInFill: function (t, e) {
                    var n = this.__attrs,
                        i = n.x,
                        r = n.y,
                        a = n.r;
                    return o.circle(i, r, a, t, e)
                }, __isPointInStroke: function (t, e) {
                    var n = this.__attrs,
                        i = n.x,
                        r = n.y,
                        a = n.r,
                        s = n.lineWidth;
                    return o.arcline(i, r, a, 0, 2 * Math.PI, !1, s, t, e)
                }, createPath: function (t) {
                    var e = this.__attrs,
                        n = e.x,
                        i = e.y,
                        r = e.r;
                    t = t || self.get("context"), t.beginPath(), t.arc(n, i, r, 0, 2 * Math.PI, !1)
                }
            }), t.exports = a
        },
        function (t, e, n) {
            var i = n(1),
                r = n(5),
                o = n(6),
                a = n(12),
                s = n(15),
                u = n(4).Vector2,
                c = function (t) {
                    c.superclass.constructor.call(this, t)
                };
            c.ATTRS = {
                p1: null,
                p2: null,
                p3: null,
                p4: null,
                lineWidth: 1,
                arrow: !1
            }, i.extend(c, r), i.augment(c, {
                canStroke: !0,
                type: "cubic",
                getDefaultAttrs: function () {
                    return {
                        lineWidth: 1
                    }
                }, calculateBox: function () {
                    var t, e, n = this.__attrs,
                        r = n.p1,
                        o = n.p2,
                        a = n.p3,
                        u = n.p4;
                    if (i.isNull(r) || i.isNull(o) || i.isNull(a) || i.isNull(u)) return null;
                    var c = n.lineWidth / 2,
                        h = s.extrema(r[0], o[0], a[0], u[0]);
                    for (t = 0, e = h.length; t < e; t++) h[t] = s.at(r[0], o[0], a[0], u[0], h[t]);
                    var l = s.extrema(r[1], o[1], a[1], u[1]);
                    for (t = 0, e = l.length; t < e; t++) l[t] = s.at(r[1], o[1], a[1], u[1], l[t]);
                    return h.push(r[0], u[0]), l.push(r[1], u[1]), {
                        minX: Math.min.apply(Math, h) - c,
                        maxX: Math.max.apply(Math, h) + c,
                        minY: Math.min.apply(Math, l) - c,
                        maxY: Math.max.apply(Math, l) + c
                    }
                }, isPointInPath: function (t, e) {
                    var n = this.__attrs,
                        i = n.p1,
                        r = n.p2,
                        a = n.p3,
                        s = n.p4,
                        u = n.lineWidth;
                    return o.cubicline(i[0], i[1], r[0], r[1], a[0], a[1], s[0], s[1], u, t, e)
                }, createPath: function (t) {
                    var e = this.__attrs,
                        n = e.p1,
                        r = e.p2,
                        o = e.p3,
                        s = e.p4,
                        c = e.lineWidth,
                        h = e.arrow;
                    if (t = t || self.get("context"), !(i.isNull(n) || i.isNull(r) || i.isNull(o) || i.isNull(s)))
                        if (t.beginPath(), t.moveTo(n[0], n[1]), h) {
                            var l = new u(s[0] - o[0], s[1] - o[1]),
                                d = a.getEndPoint(l, new u(s[0], s[1]), c);
                            t.bezierCurveTo(r[0], r[1], o[0], o[1], d.x, d.y), a.makeArrow(t, l, d, c)
                        } else t.bezierCurveTo(r[0], r[1], o[0], o[1], s[0], s[1])
                }, getPoint: function (t) {
                    var e = this.__attrs;
                    return {
                        x: s.at(e.p4[0], e.p3[0], e.p2[0], e.p1[0], t),
                        y: s.at(e.p4[1], e.p3[1], e.p2[1], e.p1[1], t)
                    }
                }
            }), t.exports = c
        },
        function (t, e, n) {
            var i = n(1),
                r = n(5),
                o = n(6),
                a = n(4),
                s = a.Matrix3,
                u = a.Vector3,
                c = function (t) {
                    c.superclass.constructor.call(this, t)
                };
            c.ATTRS = {
                x: 0,
                y: 0,
                rx: 1,
                ry: 1,
                lineWidth: 1
            }, i.extend(c, r), i.augment(c, {
                canFill: !0,
                canStroke: !0,
                type: "ellipse",
                getDefaultAttrs: function () {
                    return {
                        lineWidth: 1
                    }
                }, calculateBox: function () {
                    var t = this.__attrs,
                        e = t.x,
                        n = t.y,
                        i = t.rx,
                        r = t.ry,
                        o = t.lineWidth,
                        a = i + o / 2,
                        s = r + o / 2;
                    return {
                        minX: e - a,
                        minY: n - s,
                        maxX: e + a,
                        maxY: n + s
                    }
                }, isPointInPath: function (t, e) {
                    var n = this.hasFill(),
                        i = this.hasStroke();
                    return n && i ? this.__isPointInFill(t, e) || this.__isPointInStroke(t, e) : n ? this.__isPointInFill(t, e) : !!i && this.__isPointInStroke(t, e)
                }, __isPointInFill: function (t, e) {
                    var n = this.__attrs,
                        i = n.x,
                        r = n.y,
                        a = n.rx,
                        c = n.ry,
                        h = a > c ? a : c,
                        l = a > c ? 1 : a / c,
                        d = a > c ? c / a : 1,
                        f = new u(t, e, 1),
                        g = new s;
                    g.scale(l, d), g.translate(i, r);
                    var p = g.getInverse();
                    return f.applyMatrix(p), o.circle(0, 0, h, f.x, f.y)
                }, __isPointInStroke: function (t, e) {
                    var n = this.__attrs,
                        i = n.x,
                        r = n.y,
                        a = n.rx,
                        c = n.ry,
                        h = n.lineWidth,
                        l = a > c ? a : c,
                        d = a > c ? 1 : a / c,
                        f = a > c ? c / a : 1,
                        g = new u(t, e, 1),
                        p = new s;
                    p.scale(d, f), p.translate(i, r);
                    var v = p.getInverse();
                    return g.applyMatrix(v), o.arcline(0, 0, l, 0, 2 * Math.PI, !1, h, g.x, g.y)
                }, createPath: function (t) {
                    var e = this.__attrs,
                        n = e.x,
                        i = e.y,
                        r = e.rx,
                        o = e.ry;
                    t = t || self.get("context");
                    var a = r > o ? r : o,
                        u = r > o ? 1 : r / o,
                        c = r > o ? o / r : 1,
                        h = new s;
                    h.scale(u, c), h.translate(n, i);
                    var l = h.to2DObject();
                    t.beginPath(), t.save(), t.transform(l.a, l.b, l.c, l.d, l.e, l.f), t.arc(0, 0, a, 0, 2 * Math.PI), t.restore(), t.closePath()
                }
            }), t.exports = c
        },
        function (t, e, n) {
            var i = n(1),
                r = n(5),
                o = n(6),
                a = n(8),
                s = n(20),
                u = n(4),
                c = u.Vector2,
                h = function (t) {
                    h.superclass.constructor.call(this, t)
                };
            h.ATTRS = {
                x: 0,
                y: 0,
                rs: 0,
                re: 0,
                startAngle: 0,
                endAngle: 0,
                clockwise: !1,
                lineWidth: 1
            }, i.extend(h, r), i.augment(h, {
                canFill: !0,
                canStroke: !0,
                type: "fan",
                getDefaultAttrs: function () {
                    return {
                        clockwise: !1,
                        lineWidth: 1,
                        rs: 0,
                        re: 0
                    }
                }, calculateBox: function () {
                    var t = this,
                        e = t.__attrs,
                        n = e.x,
                        i = e.y,
                        r = e.rs,
                        o = e.re,
                        a = e.startAngle,
                        u = e.endAngle,
                        c = e.clockwise,
                        h = e.lineWidth,
                        l = s.box(n, i, r, a, u, c),
                        d = s.box(n, i, o, a, u, c),
                        f = Math.min(l.minX, d.minX),
                        g = Math.min(l.minY, d.minY),
                        p = Math.max(l.maxX, d.maxX),
                        v = Math.max(l.maxY, d.maxY),
                        m = h / 2;
                    return {
                        minX: f - m,
                        minY: g - m,
                        maxX: p + m,
                        maxY: v + m
                    }
                }, isPointInPath: function (t, e) {
                    var n = this.hasFill(),
                        i = this.hasStroke();
                    return n && i ? this.__isPointInFill(t, e) || this.__isPointInStroke(t, e) : n ? this.__isPointInFill(t, e) : !!i && this.__isPointInStroke(t, e)
                }, __isPointInFill: function (t, e) {
                    var n = this.__attrs,
                        i = n.x,
                        r = n.y,
                        o = n.rs,
                        u = n.re,
                        h = n.startAngle,
                        l = n.endAngle,
                        d = n.clockwise,
                        f = new c(1, 0),
                        g = new c(t - i, e - r),
                        p = f.angleTo(g),
                        v = s.nearAngle(p, h, l, d);
                    if (a.equal(p, v)) {
                        var m = g.lengthSq();
                        if (o * o <= m && m <= u * u) return !0
                    }
                    return !1
                }, __isPointInStroke: function (t, e) {
                    var n = this.__attrs,
                        i = n.x,
                        r = n.y,
                        a = n.rs,
                        s = n.re,
                        u = n.startAngle,
                        c = n.endAngle,
                        h = n.clockwise,
                        l = n.lineWidth,
                        d = {
                            x: Math.cos(u) * a + i,
                            y: Math.sin(u) * a + r
                        },
                        f = {
                            x: Math.cos(u) * s + i,
                            y: Math.sin(u) * s + r
                        },
                        g = {
                            x: Math.cos(c) * a + i,
                            y: Math.sin(c) * a + r
                        },
                        p = {
                            x: Math.cos(c) * s + i,
                            y: Math.sin(c) * s + r
                        };
                    return !!o.line(d.x, d.y, f.x, f.y, l, t, e) || (!!o.line(g.x, g.y, p.x, p.y, l, t, e) || (!!o.arcline(i, r, a, u, c, h, l, t, e) || !!o.arcline(i, r, s, u, c, h, l, t, e)))
                }, createPath: function (t) {
                    var e = this.__attrs,
                        n = e.x,
                        i = e.y,
                        r = e.rs,
                        o = e.re,
                        a = e.startAngle,
                        s = e.endAngle,
                        u = e.clockwise,
                        c = {
                            x: Math.cos(a) * r + n,
                            y: Math.sin(a) * r + i
                        },
                        h = {
                            x: Math.cos(a) * o + n,
                            y: Math.sin(a) * o + i
                        },
                        l = {
                            x: Math.cos(s) * r + n,
                            y: Math.sin(s) * r + i
                        };
                    t = t || self.get("context"), t.beginPath(), t.moveTo(c.x, c.y), t.lineTo(h.x, h.y), t.arc(n, i, o, a, s, u), t.lineTo(l.x, l.y), t.arc(n, i, r, s, a, !u), t.closePath()
                }
            }), t.exports = h
        },
        function (t, e, n) {
            var i = n(1),
                r = n(5),
                o = n(6),
                a = function (t) {
                    a.superclass.constructor.call(this, t)
                };
            a.ATTRS = {
                x: 0,
                y: 0,
                img: void 0,
                width: 0,
                height: 0,
                sx: null,
                sy: null,
                swidth: null,
                sheight: null
            }, i.extend(a, r), i.augment(a, {
                type: "image",
                __afterSetAttrImg: function (t) {
                    this.__setAttrImg(t)
                }, __afterSetAttrAll: function (t) {
                    t.img && this.__setAttrImg(t.img)
                }, isHitBox: function () {
                    return !1
                }, calculateBox: function () {
                    var t = this.__attrs,
                        e = t.x,
                        n = t.y,
                        i = t.width,
                        r = t.height;
                    return {
                        minX: e,
                        minY: n,
                        maxX: e + i,
                        maxY: n + r
                    }
                }, isPointInPath: function (t, e) {
                    var n = this.__attrs;
                    if (this.get("toDraw") || !n.img) return !1;
                    var i = n.x,
                        r = n.y,
                        a = n.width,
                        s = n.height;
                    return o.rect(i, r, a, s, t, e)
                }, __setLoading: function (t) {
                    var e = this.get("canvas");
                    return t === !1 && this.get("toDraw") === !0 && (this.__cfg.loading = !1, e.draw()), t
                }, __setAttrImg: function (t) {
                    var e = this,
                        n = e.__attrs;
                    if (!i.isString(t)) return t instanceof Image ? (n.width || e.attr("width", t.width), n.height || e.attr("height", t.height), t) : t instanceof HTMLElement && i.isString(t.nodeName) && "CANVAS" === t.nodeName.toUpperCase() ? (n.width || e.attr("width", Number(t.getAttribute("width"))), n.height || e.attr("height", Number(t.getAttribute("height"))), t) : t instanceof ImageData ? (n.width || e.attr("width", t.width), n.height || e.attr("height", t.height), t) : null;
                    var r = new Image;
                    r.onload = function () {
                        if (e.get("destroyed")) return !1;
                        e.attr("imgSrc", t), e.attr("img", r);
                        var n = e.get("callback");
                        n && n.call(e), e.set("loading", !1)
                    }, r.src = t, e.set("loading", !0)
                }, drawInner: function (t) {
                    return this.get("loading") ? void this.set("toDraw", !0) : void this.__drawImage(t)
                }, __drawImage: function (t) {
                    var e = this.__attrs,
                        n = e.x,
                        r = e.y,
                        o = e.img,
                        a = e.width,
                        s = e.height,
                        u = e.sx,
                        c = e.sy,
                        h = e.swidth,
                        l = e.sheight;
                    if (this.set("toDraw", !1), o instanceof Image || o instanceof HTMLElement && i.isString(o.nodeName) && "CANVAS" === o.nodeName.toUpperCase()) {
                        if (i.isNull(u) || i.isNull(c) || i.isNull(h) || i.isNull(l)) return void t.drawImage(o, n, r, a, s);
                        if (i.notNull(u) && i.notNull(c) && i.notNull(h) && i.notNull(l)) return void t.drawImage(o, u, c, h, l, n, r, a, s)
                    } else if (o instanceof ImageData) return void t.putImageData(o, n, r, u || 0, c || 0, h || a, l || s)
                }
            }), t.exports = a
        },
        function (t, e, n) {
            var i = {
                Rect: n(52),
                Circle: n(40),
                Ellipse: n(42),
                Path: n(48),
                Text: n(53),
                Line: n(46),
                Image: n(44),
                Polygon: n(49),
                Polyline: n(50),
                Arc: n(39),
                Fan: n(43),
                Cubic: n(41),
                Quadratic: n(51),
                Marker: n(47)
            };
            t.exports = i
        },
        function (t, e, n) {
            var i = n(1),
                r = n(5),
                o = n(6),
                a = n(12),
                s = n(21),
                u = n(4),
                c = u.Vector2,
                h = function (t) {
                    h.superclass.constructor.call(this, t)
                };
            h.ATTRS = {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                lineWidth: 1,
                arrow: !1
            }, i.extend(h, r), i.augment(h, {
                canStroke: !0,
                type: "line",
                getDefaultAttrs: function () {
                    return {
                        lineWidth: 1,
                        arrow: !1
                    }
                }, calculateBox: function () {
                    var t = this.__attrs,
                        e = t.x1,
                        n = t.y1,
                        i = t.x2,
                        r = t.y2,
                        o = t.lineWidth;
                    return s.box(e, n, i, r, o)
                }, isPointInPath: function (t, e) {
                    var n = this.__attrs,
                        i = n.x1,
                        r = n.y1,
                        a = n.x2,
                        s = n.y2,
                        u = n.lineWidth;
                    return !!this.hasStroke() && o.line(i, r, a, s, u, t, e)
                }, createPath: function (t) {
                    var e = this.__attrs,
                        n = e.x1,
                        i = e.y1,
                        r = e.x2,
                        o = e.y2,
                        s = e.arrow,
                        u = e.lineWidth;
                    if (t = t || self.get("context"), t.beginPath(), t.moveTo(n, i), s) {
                        var h = new c(r - n, o - i),
                            l = a.getEndPoint(h, new c(r, o), u);
                        t.lineTo(l.x, l.y), a.makeArrow(t, h, l, u)
                    } else t.lineTo(r, o)
                }, getPoint: function (t) {
                    var e = this.__attrs;
                    return {
                        x: s.at(e.x1, e.x2, t),
                        y: s.at(e.y1, e.y2, t)
                    }
                }
            }), t.exports = h
        },
        function (t, e, n) {
            var i = n(1),
                r = n(5),
                o = n(6),
                a = function (t) {
                    a.superclass.constructor.call(this, t)
                };
            a.Symbols = {
                circle: function (t, e, n, i) {
                    i.arc(t, e, n, 0, 2 * Math.PI, !1)
                }, square: function (t, e, n, i) {
                    i.moveTo(t - n, e - n), i.lineTo(t + n, e - n), i.lineTo(t + n, e + n), i.lineTo(t - n, e + n), i.closePath()
                }, diamond: function (t, e, n, i) {
                    i.moveTo(t - n, e), i.lineTo(t, e - n), i.lineTo(t + n, e), i.lineTo(t, e + n), i.closePath()
                }, triangle: function (t, e, n, i) {
                    var r = n / .966,
                        o = n;
                    i.moveTo(t, e - n), i.lineTo(t + r, e + o), i.lineTo(t - r, e + o), i.closePath()
                }, "triangle-down": function (t, e, n, i) {
                    var r = n / .966,
                        o = n;
                    i.moveTo(t, e + n), i.lineTo(t + r, e - o), i.lineTo(t - r, e - o), i.closePath()
                }
            }, a.ATTRS = {
                path: null,
                lineWidth: 1
            }, i.extend(a, r), i.augment(a, {
                type: "marker",
                canFill: !0,
                canStroke: !0,
                getDefaultAttrs: function () {
                    return {
                        x: 0,
                        y: 0,
                        lineWidth: 1
                    }
                }, calculateBox: function () {
                    var t = this.__attrs,
                        e = t.x,
                        n = t.y,
                        i = t.radius,
                        r = t.lineWidth,
                        o = r / 2 + i;
                    return {
                        minX: e - o,
                        minY: n - o,
                        maxX: e + o,
                        maxY: n + o
                    }
                }, isPointInPath: function (t, e) {
                    var n = this.__attrs,
                        i = n.x,
                        r = n.y,
                        a = n.radius;
                    return o.circle(i, r, a, t, e)
                }, createPath: function (t) {
                    var e, n = this.__attrs,
                        r = n.x,
                        o = n.y,
                        s = n.radius,
                        u = n.symbol || "circle";
                    e = i.isFunction(u) ? u : a.Symbols[u], t.beginPath(), e(r, o, s, t)
                }
            }), t.exports = a
        },
        function (t, e, n) {
            var i = n(1),
                r = n(5),
                o = n(88),
                a = n(37),
                s = n(12),
                u = n(23),
                c = n(15),
                h = n(4),
                l = h.Vector2,
                d = function (t) {
                    d.superclass.constructor.call(this, t)
                };
            d.ATTRS = {
                path: null,
                lineWidth: 1,
                curve: null,
                tCache: null
            }, i.extend(d, r), i.augment(d, {
                canFill: !0,
                canStroke: !0,
                type: "path",
                getDefaultAttrs: function () {
                    return {
                        lineWidth: 1
                    }
                }, __afterSetAttrPath: function (t) {
                    var e = this;
                    if (i.isNull(t)) return e.setSilent("segments", null), void e.setSilent("box", void 0);
                    var n, r = a.parsePath(t),
                        s = [];
                    if (i.isArray(r) && 0 !== r.length && ("M" === r[0][0] || "m" === r[0][0])) {
                        for (var u = r.length, c = 0; c < r.length; c++) {
                            var h = r[c];
                            n = new o(h, n, c === u - 1), s.push(n)
                        }
                        e.setSilent("segments", s), e.set("tCache", null), this.setSilent("box", null)
                    }
                }, __afterSetAttrAll: function (t) {
                    t.path && this.__afterSetAttrPath(t.path)
                }, calculateBox: function () {
                    var t = this,
                        e = t.__attrs,
                        n = e.lineWidth,
                        r = e.lineAppendWidth || 0,
                        o = t.get("segments");
                    if (!o) return null;
                    n += r;
                    var a = 1 / 0,
                        s = -(1 / 0),
                        u = 1 / 0,
                        c = -(1 / 0);
                    return i.each(o, function (t) {
                        t.getBBox(n);
                        var e = t.box;
                        e && (e.minX < a && (a = e.minX), e.maxX > s && (s = e.maxX), e.minY < u && (u = e.minY), e.maxY > c && (c = e.maxY))
                    }), {
                        minX: a,
                        minY: u,
                        maxX: s,
                        maxY: c
                    }
                }, isPointInPath: function (t, e) {
                    var n = this,
                        i = n.hasFill(),
                        r = n.hasStroke();
                    return i && r ? n.__isPointInFill(t, e) || n.__isPointInStroke(t, e) : i ? n.__isPointInFill(t, e) : !!r && n.__isPointInStroke(t, e)
                }, __isPointInFill: function (t, e) {
                    var n = this,
                        i = n.get("context");
                    if (i) return n.createPath(), i.isPointInPath(t, e)
                }, __isPointInStroke: function (t, e) {
                    var n = this,
                        i = n.get("segments"),
                        r = n.__attrs,
                        o = r.lineWidth,
                        a = r.lineAppendWidth || 0;
                    o += a;
                    for (var s = 0, u = i.length; s < u; s++)
                        if (i[s].isInside(t, e, o)) return !0;
                    return !1
                }, __setTcache: function () {
                    var t, e, n, r, o = 0,
                        a = 0,
                        s = [],
                        u = this.curve;
                    u && (i.each(u, function (t, e) {
                        n = u[e + 1], r = t.length, n && (o += c.len(t[r - 2], t[r - 1], n[1], n[2], n[3], n[4], n[5], n[6]))
                    }), i.each(u, function (i, h) {
                        n = u[h + 1], r = i.length, n && (t = [], t[0] = a / o, e = c.len(i[r - 2], i[r - 1], n[1], n[2], n[3], n[4], n[5], n[6]), a += e, t[1] = a / o, s.push(t))
                    }), this.tCache = s)
                }, __calculateCurve: function () {
                    var t = this,
                        e = t.__attrs,
                        n = e.path;
                    this.curve = u.toCurve(n)
                }, getPoint: function (t) {
                    var e, n, r, o, a, s, u = this.tCache;
                    return u || (this.__calculateCurve(), this.__setTcache(), u = this.tCache), e = this.curve, u ? (i.each(u, function (e, i) {
                        t >= e[0] && t <= e[1] && (n = (t - e[0]) / (e[1] - e[0]), r = i)
                    }), o = e[r], i.isNull(o) || i.isNull(r) ? null : (a = o.length, s = e[r + 1], {
                        x: c.at(o[a - 2], s[1], s[3], s[5], 1 - n),
                        y: c.at(o[a - 1], s[2], s[4], s[6], 1 - n)
                    })) : e ? {
                        x: e[0][1],
                        y: e[0][2]
                    } : null
                }, createPath: function (t) {
                    var e = this,
                        n = e.__attrs,
                        r = e.get("segments"),
                        o = n.lineWidth,
                        a = n.arrow;
                    if (i.isArray(r)) {
                        t = t || e.get("context"), t.beginPath();
                        for (var u = 0, c = r.length; u < c; u++)
                            if (u === c - 1 && a) {
                                var h = r[u],
                                    d = r[u].endTangent,
                                    f = {
                                        x: h.params[h.params.length - 1].x,
                                        y: h.params[h.params.length - 1].y
                                    };
                                if (h && i.isFunction(d)) {
                                    var g = d(),
                                        p = s.getEndPoint(g, new l(f.x, f.y), o);
                                    h.params[h.params.length - 1] = p, r[u].draw(t), s.makeArrow(t, g, p, o), h.params[h.params.length - 1] = f
                                }
                            } else r[u].draw(t)
                    }
                }
            }), t.exports = d
        },
        function (t, e, n) {
            var i = n(1),
                r = n(5),
                o = n(6),
                a = function (t) {
                    a.superclass.constructor.call(this, t)
                };
            a.ATTRS = {
                points: null,
                lineWidth: 1
            }, i.extend(a, r), i.augment(a, {
                canFill: !0,
                canStroke: !0,
                type: "polygon",
                getDefaultAttrs: function () {
                    return {
                        lineWidth: 1
                    }
                }, calculateBox: function () {
                    var t = this,
                        e = t.__attrs,
                        n = e.points,
                        r = e.lineWidth;
                    if (!n || 0 === n.length) return null;
                    var o = 1 / 0,
                        a = 1 / 0,
                        s = -(1 / 0),
                        u = -(1 / 0);
                    i.each(n, function (t) {
                        var e = t[0],
                            n = t[1];
                        e < o && (o = e), e > s && (s = e), n < a && (a = n), n > u && (u = n)
                    });
                    var c = r / 2;
                    return {
                        minX: o - c,
                        minY: a - c,
                        maxX: s + c,
                        maxY: u + c
                    }
                }, isPointInPath: function (t, e) {
                    var n = this,
                        i = n.hasFill(),
                        r = n.hasStroke();
                    return i && r ? n.__isPointInFill(t, e) || n.__isPointInStroke(t, e) : i ? n.__isPointInFill(t, e) : !!r && n.__isPointInStroke(t, e)
                }, __isPointInFill: function (t, e) {
                    var n = this,
                        i = n.get("context");
                    return n.createPath(), i.isPointInPath(t, e)
                }, __isPointInStroke: function (t, e) {
                    var n = this,
                        i = n.__attrs,
                        r = i.points;
                    if (r.length < 2) return !1;
                    var a = i.lineWidth,
                        s = r.slice(0);
                    return r.length >= 3 && s.push(r[0]), o.polyline(s, a, t, e)
                }, createPath: function (t) {
                    var e = this,
                        n = e.__attrs,
                        r = n.points;
                    r.length < 2 || (t = t || e.get("context"), t.beginPath(), i.each(r, function (e, n) {
                        0 === n ? t.moveTo(e[0], e[1]) : t.lineTo(e[0], e[1])
                    }), t.closePath())
                }
            }), t.exports = a
        },
        function (t, e, n) {
            var i = n(1),
                r = n(5),
                o = n(6),
                a = n(12),
                s = n(21),
                u = n(4),
                c = u.Vector2,
                h = function (t) {
                    h.superclass.constructor.call(this, t)
                };
            h.ATTRS = {
                points: null,
                lineWidth: 1,
                arrow: !1,
                tCache: null
            }, i.extend(h, r), i.augment(h, {
                canStroke: !0,
                type: "polyline",
                tCache: null,
                getDefaultAttrs: function () {
                    return {
                        lineWidth: 1,
                        arrow: !1
                    }
                }, calculateBox: function () {
                    var t = this,
                        e = t.__attrs,
                        n = e.lineWidth,
                        r = e.points;
                    if (!r || 0 === r.length) return null;
                    var o = 1 / 0,
                        a = 1 / 0,
                        s = -(1 / 0),
                        u = -(1 / 0);
                    i.each(r, function (t) {
                        var e = t[0],
                            n = t[1];
                        e < o && (o = e), e > s && (s = e), n < a && (a = n), n > u && (u = n)
                    });
                    var c = n / 2;
                    return {
                        minX: o - c,
                        minY: a - c,
                        maxX: s + c,
                        maxY: u + c
                    }
                }, __setTcache: function () {
                    var t, e, n = this,
                        r = n.__attrs,
                        o = r.points,
                        a = 0,
                        u = 0,
                        c = [];
                    o && 0 !== o.length && (i.each(o, function (t, e) {
                        o[e + 1] && (a += s.len(t[0], t[1], o[e + 1][0], o[e + 1][1]))
                    }), a <= 0 || (i.each(o, function (n, i) {
                        o[i + 1] && (t = [], t[0] = u / a, e = s.len(n[0], n[1], o[i + 1][0], o[i + 1][1]), u += e, t[1] = u / a, c.push(t))
                    }), this.tCache = c))
                }, isPointInPath: function (t, e) {
                    var n = this,
                        i = n.__attrs;
                    if (n.hasStroke()) {
                        var r = i.points;
                        if (r.length < 2) return !1;
                        var a = i.lineWidth;
                        return o.polyline(r, a, t, e)
                    }
                    return !1
                }, createPath: function (t) {
                    var e, n, i = this,
                        r = i.__attrs,
                        o = r.points,
                        s = r.arrow,
                        u = r.lineWidth;
                    if (!(o.length < 2)) {
                        for (t = t || i.get("context"), t.beginPath(), t.moveTo(o[0][0], o[0][1]), n = 1, e = o.length - 1; n < e; n++) t.lineTo(o[n][0], o[n][1]);
                        if (s) {
                            var h = new c(o[e][0] - o[e - 1][0], o[e][1] - o[e - 1][1]),
                                l = a.getEndPoint(h, new c(o[e][0], o[e][1]), u);
                            t.lineTo(l.x, l.y), a.makeArrow(t, h, l, u)
                        } else t.lineTo(o[e][0], o[e][1])
                    }
                }, getPoint: function (t) {
                    var e, n, r = this.__attrs,
                        o = r.points,
                        a = this.tCache;
                    return a || (this.__setTcache(), a = this.tCache), i.each(a, function (i, r) {
                        t >= i[0] && t <= i[1] && (e = (t - i[0]) / (i[1] - i[0]), n = r)
                    }), {
                        x: s.at(o[n][0], o[n + 1][0], e),
                        y: s.at(o[n][1], o[n + 1][1], e)
                    }
                }
            }), t.exports = h
        },
        function (t, e, n) {
            var i = n(1),
                r = n(5),
                o = n(6),
                a = n(12),
                s = n(22),
                u = n(4).Vector2,
                c = function (t) {
                    c.superclass.constructor.call(this, t)
                };
            c.ATTRS = {
                p1: null,
                p2: null,
                p3: null,
                lineWidth: 1,
                arrow: !1
            }, i.extend(c, r), i.augment(c, {
                canStroke: !0,
                type: "quadratic",
                getDefaultAttrs: function () {
                    return {
                        lineWidth: 1,
                        arrow: !1
                    }
                }, calculateBox: function () {
                    var t, e, n = this,
                        r = n.__attrs,
                        o = r.p1,
                        a = r.p2,
                        u = r.p3;
                    if (i.isNull(o) || i.isNull(a) || i.isNull(u)) return null;
                    var c = r.lineWidth / 2,
                        h = s.extrema(o[0], a[0], u[0]);
                    for (t = 0, e = h.length; t < e; t++) h[t] = s.at(o[0], a[0], u[0], h[t]);
                    h.push(o[0], u[0]);
                    var l = s.extrema(o[1], a[1], u[1]);
                    for (t = 0, e = l.length; t < e; t++) l[t] = s.at(o[1], a[1], u[1], l[t]);
                    return l.push(o[1], u[1]), {
                        minX: Math.min.apply(Math, h) - c,
                        maxX: Math.max.apply(Math, h) + c,
                        minY: Math.min.apply(Math, l) - c,
                        maxY: Math.max.apply(Math, l) + c
                    }
                }, isPointInPath: function (t, e) {
                    var n = this,
                        i = n.__attrs,
                        r = i.p1,
                        a = i.p2,
                        s = i.p3,
                        u = i.lineWidth;
                    return o.quadraticline(r[0], r[1], a[0], a[1], s[0], s[1], u, t, e)
                }, createPath: function (t) {
                    var e = this,
                        n = e.__attrs,
                        r = n.p1,
                        o = n.p2,
                        s = n.p3,
                        c = n.lineWidth,
                        h = n.arrow;
                    if (!(i.isNull(r) || i.isNull(o) || i.isNull(s)))
                        if (t = t || e.get("context"), t.beginPath(), t.moveTo(r[0], r[1]), h) {
                            var l = new u(s[0] - o[0], s[1] - o[1]),
                                d = a.getEndPoint(l, new u(s[0], s[1]), c);
                            t.quadraticCurveTo(o[0], o[1], d.x, d.y), a.makeArrow(t, l, d, c)
                        } else t.quadraticCurveTo(o[0], o[1], s[0], s[1])
                }, getPoint: function (t) {
                    var e = this.__attrs;
                    return {
                        x: s.at(e.p1[0], e.p2[0], e.p3[0], t),
                        y: s.at(e.p1[1], e.p2[1], e.p3[1], t)
                    }
                }
            }), t.exports = c
        },
        function (t, e, n) {
            var i = n(1),
                r = n(5),
                o = n(6),
                a = function (t) {
                    a.superclass.constructor.call(this, t)
                };
            a.ATTRS = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                radius: 0,
                lineWidth: 1
            }, i.extend(a, r), i.augment(a, {
                canFill: !0,
                canStroke: !0,
                type: "rect",
                getDefaultAttrs: function () {
                    return {
                        lineWidth: 1,
                        radius: 0
                    }
                }, calculateBox: function () {
                    var t = this,
                        e = t.__attrs,
                        n = e.x,
                        i = e.y,
                        r = e.width,
                        o = e.height,
                        a = e.lineWidth,
                        s = a / 2;
                    return {
                        minX: n - s,
                        minY: i - s,
                        maxX: n + r + s,
                        maxY: i + o + s
                    }
                }, isPointInPath: function (t, e) {
                    var n = this,
                        i = n.hasFill(),
                        r = n.hasStroke();
                    return i && r ? n.__isPointInFill(t, e) || n.__isPointInStroke(t, e) : i ? n.__isPointInFill(t, e) : !!r && n.__isPointInStroke(t, e)
                }, __isPointInFill: function (t, e) {
                    var n = this.get("context");
                    return !!n && (this.createPath(), n.isPointInPath(t, e))
                }, __isPointInStroke: function (t, e) {
                    var n = this,
                        i = n.__attrs,
                        r = i.x,
                        a = i.y,
                        s = i.width,
                        u = i.height,
                        c = i.radius,
                        h = i.lineWidth;
                    if (0 === c) {
                        var l = h / 2;
                        return o.line(r - l, a, r + s + l, a, h, t, e) || o.line(r + s, a - l, r + s, a + u + l, h, t, e) || o.line(r + s + l, a + u, r - l, a + u, h, t, e) || o.line(r, a + u + l, r, a - l, h, t, e)
                    }
                    return o.line(r + c, a, r + s - c, a, h, t, e) || o.line(r + s, a + c, r + s, a + u - c, h, t, e) || o.line(r + s - c, a + u, r + c, a + u, h, t, e) || o.line(r, a + u - c, r, a + c, h, t, e) || o.arcline(r + s - c, a + c, c, 1.5 * Math.PI, 2 * Math.PI, !1, h, t, e) || o.arcline(r + s - c, a + u - c, c, 0, .5 * Math.PI, !1, h, t, e) || o.arcline(r + c, a + u - c, c, .5 * Math.PI, Math.PI, !1, h, t, e) || o.arcline(r + c, a + c, c, Math.PI, 1.5 * Math.PI, !1, h, t, e)
                }, createPath: function (t) {
                    var e = this,
                        n = e.__attrs,
                        i = n.x,
                        r = n.y,
                        o = n.width,
                        a = n.height,
                        s = n.radius;
                    t = t || e.get("context"), t.beginPath(), 0 === s ? t.rect(i, r, o, a) : (t.moveTo(i + s, r), t.lineTo(i + o - s, r), t.arc(i + o - s, r + s, s, -Math.PI / 2, 0, !1), t.lineTo(i + o, r + a - s),
                        t.arc(i + o - s, r + a - s, s, 0, Math.PI / 2, !1), t.lineTo(i + s, r + a), t.arc(i + s, r + a - s, s, Math.PI / 2, Math.PI, !1), t.lineTo(i, r + s), t.arc(i + s, r + s, s, Math.PI, 3 * Math.PI / 2, !1), t.closePath())
                }
            }), t.exports = a
        },
        function (t, e, n) {
            var i = n(1),
                r = n(5),
                o = n(6),
                a = n(35),
                s = function (t) {
                    s.superclass.constructor.call(this, t)
                };
            s.ATTRS = {
                x: 0,
                y: 0,
                text: null,
                fontSize: 12,
                fontFamily: "sans-serif",
                fontStyle: "normal",
                fontWeight: "normal",
                fontVariant: "normal",
                textAlign: "start",
                textBaseline: "bottom",
                lineHeight: null,
                textArr: null
            }, i.extend(s, r), i.augment(s, {
                canFill: !0,
                canStroke: !0,
                type: "text",
                getDefaultAttrs: function () {
                    return {
                        lineWidth: 1,
                        lineCount: 1,
                        fontSize: 12,
                        fontFamily: "sans-serif",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontVariant: "normal",
                        textAlign: "start",
                        textBaseline: "bottom"
                    }
                }, __assembleFont: function () {
                    var t = this.__attrs,
                        e = t.fontSize,
                        n = t.fontFamily,
                        i = t.fontWeight,
                        r = t.fontStyle,
                        o = t.fontVariant;
                    t.font = [r, o, i, e + "px", n].join(" ")
                }, __afterSetAttrFontSize: function () {
                    this.__assembleFont()
                }, __afterSetAttrFontFamily: function () {
                    this.__assembleFont()
                }, __afterSetAttrFontWeight: function () {
                    this.__assembleFont()
                }, __afterSetAttrFontStyle: function () {
                    this.__assembleFont()
                }, __afterSetAttrFontVariant: function () {
                    this.__assembleFont()
                }, __afterSetAttrFont: function () {}, __afterSetAttrText: function () {
                    var t, e = this.__attrs,
                        n = e.text;
                    if (i.isString(n) && n.indexOf("\n") !== -1) {
                        t = n.split("\n");
                        var r = t.length;
                        e.lineCount = r, e.textArr = t
                    }
                }, __getTextHeight: function () {
                    var t = this.__attrs,
                        e = t.lineCount,
                        n = 1 * t.fontSize;
                    if (e > 1) {
                        var i = this.__getSpaceingY();
                        return n * e + i * (e - 1)
                    }
                    return n
                }, __afterSetAttrAll: function (t) {
                    var e = this;
                    ("fontSize" in t || "fontWeight" in t || "fontStyle" in t || "fontVariant" in t || "fontFamily" in t) && e.__assembleFont(), "text" in t && e.__afterSetAttrText(t.text)
                }, isHitBox: function () {
                    return !1
                }, calculateBox: function () {
                    var t = this,
                        e = t.__attrs,
                        n = e.x,
                        i = e.y,
                        r = t.measureText();
                    if (!r) return {
                        minX: n,
                        minY: i,
                        maxX: n,
                        maxY: i
                    };
                    var o = t.__getTextHeight(),
                        a = e.textAlign,
                        s = e.textBaseline,
                        u = e.lineWidth,
                        c = {
                            x: n,
                            y: i - o
                        };
                    a && ("end" === a || "right" === a ? c.x -= r : "center" === a && (c.x -= r / 2)), s && ("top" === s ? c.y += o : "middle" === s && (c.y += o / 2)), this.set("startPoint", c);
                    var h = u / 2;
                    return {
                        minX: c.x - h,
                        minY: c.y - h,
                        maxX: c.x + r + h,
                        maxY: c.y + o + h
                    }
                }, __getSpaceingY: function () {
                    var t = this.__attrs,
                        e = t.lineHeight,
                        n = 1 * t.fontSize;
                    return e ? e - n : .14 * n
                }, isPointInPath: function (t, e) {
                    var n = this,
                        i = n.getBBox();
                    if (n.hasFill() || n.hasStroke()) return o.box(i.minX, i.maxX, i.minY, i.maxY, t, e)
                }, drawInner: function (t) {
                    var e = this,
                        n = e.__attrs,
                        r = n.text;
                    if (r) {
                        var o, a = n.textArr,
                            s = 1 * n.fontSize,
                            u = e.__getSpaceingY(),
                            c = n.x,
                            h = n.y,
                            l = n.textBaseline;
                        if (a) {
                            var d = e.getBBox();
                            o = d.maxY - d.minY
                        }
                        var f;
                        if (t.beginPath(), e.hasFill()) {
                            var g = n.fillOpacity;
                            i.isNull(g) || 1 === g || (t.globalAlpha = g), a ? i.each(a, function (e, n) {
                                f = h + n * (u + s) - o + s, "middle" === l && (f += o - s - (o - s) / 2), "top" === l && (f += o - s), t.fillText(e, c, f)
                            }) : t.fillText(r, c, h)
                        }
                        e.hasStroke() && (a ? i.each(a, function (e, n) {
                            f = h + n * (u + s) - o + s, "middle" === l && (f += o - s - (o - s) / 2), "top" === l && (f += o - s), t.strokeText(e, c, f)
                        }) : t.strokeText(r, c, h))
                    }
                }, measureText: function () {
                    var t, e = this,
                        n = e.__attrs,
                        r = n.text,
                        o = n.font,
                        s = n.textArr,
                        u = 0;
                    if (!i.isNull(r)) {
                        var c = a.backupContext;
                        return c.save(), c.font = o, s ? i.each(s, function (e) {
                            t = c.measureText(e).width, u < t && (u = t), c.restore()
                        }) : (u = c.measureText(r).width, c.restore()), u
                    }
                }
            }), t.exports = s
        },
        function (t, e, n) {
            var i = n(1),
                r = n(90),
                o = n(89),
                a = n(23);
            i.mix(i, o, {
                mixin: function (t, e) {
                    var n = t.CFG ? "CFG" : "ATTRS";
                    if (t && e) {
                        t._mixins = e, t[n] = t[n] || {};
                        var r = {};
                        i.each(e, function (e) {
                            i.augment(t, e);
                            var o = e[n];
                            o && i.mix(r, o)
                        }), t[n] = i.mix(r, t[n])
                    }
                }, isPositiveNum: function (t) {
                    var e = /^[0-9]*[1-9][0-9]*$/;
                    return e.test(t)
                }, getRatio: function () {
                    return window.devicePixelRatio ? window.devicePixelRatio : 2
                }, getWidth: function (t) {
                    var e = i.getStyle(t, "width");
                    return "auto" === e && (e = t.offsetWidth), parseFloat(e)
                }, getHeight: function (t) {
                    var e = i.getStyle(t, "height");
                    return "auto" === e && (e = t.offsetHeight), parseFloat(e)
                }, getOuterHeight: function (t) {
                    var e = i.getHeight(t),
                        n = parseFloat(i.getStyle(t, "borderTopWidth")) || 0,
                        r = parseFloat(i.getStyle(t, "paddingTop")),
                        o = parseFloat(i.getStyle(t, "paddingBottom")),
                        a = parseFloat(i.getStyle(t, "borderBottomWidth")) || 0;
                    return e + n + a + r + o
                }, parsePathString: a.toArray,
                path2string: a.toString,
                path2curve: a.toCurve,
                pathToAbsolute: a.toAbsolute,
                catmullRom2bezier: a.catmullRomToBezier,
                parsePathArray: function (t) {
                    return i.path2string(t)
                }, path2Absolute: function (t) {
                    return i.pathToAbsolute(t)
                }
            }), i.MatrixUtil = r, t.exports = i
        },
        function (t, e, n) {
            var i = n(110);
            i.Tween = n(58), i.Ease = n(56), t.exports = i
        },
        function (t, e) {
            var n = {
                linear: function (t) {
                    return t
                }, easeInQuad: function (t) {
                    return t * t
                }, easeOutQuad: function (t) {
                    return -1 * t * (t - 2)
                }, easeInOutQuad: function (t) {
                    return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
                }, easeInCubic: function (t) {
                    return t * t * t
                }, easeOutCubic: function (t) {
                    return 1 * ((t = t / 1 - 1) * t * t + 1)
                }, easeInOutCubic: function (t) {
                    return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
                }, easeInQuart: function (t) {
                    return t * t * t * t
                }, easeOutQuart: function (t) {
                    return -1 * ((t = t / 1 - 1) * t * t * t - 1)
                }, easeInOutQuart: function (t) {
                    return (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
                }, easeInQuint: function (t) {
                    return 1 * (t /= 1) * t * t * t * t
                }, easeOutQuint: function (t) {
                    return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
                }, easeInOutQuint: function (t) {
                    return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
                }, easeInSine: function (t) {
                    return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
                }, easeOutSine: function (t) {
                    return 1 * Math.sin(t / 1 * (Math.PI / 2))
                }, easeInOutSine: function (t) {
                    return -.5 * (Math.cos(Math.PI * t / 1) - 1)
                }, easeInExpo: function (t) {
                    return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
                }, easeOutExpo: function (t) {
                    return 1 === t ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1)
                }, easeInOutExpo: function (t) {
                    return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (-Math.pow(2, -10 * --t) + 2)
                }, easeInCirc: function (t) {
                    return t >= 1 ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1)
                }, easeOutCirc: function (t) {
                    return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
                }, easeInOutCirc: function (t) {
                    return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                }, easeInElastic: function (t) {
                    var e = 1.70158,
                        n = 0,
                        i = 1;
                    return 0 === t ? 0 : 1 == (t /= 1) ? 1 : (n || (n = .3), i < Math.abs(1) ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), -(i * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / n)))
                }, easeOutElastic: function (t) {
                    var e = 1.70158,
                        n = 0,
                        i = 1;
                    return 0 === t ? 0 : 1 == (t /= 1) ? 1 : (n || (n = .3), i < Math.abs(1) ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), i * Math.pow(2, -10 * t) * Math.sin((1 * t - e) * (2 * Math.PI) / n) + 1)
                }, easeInOutElastic: function (t) {
                    var e = 1.70158,
                        n = 0,
                        i = 1;
                    return 0 === t ? 0 : 2 == (t /= .5) ? 1 : (n || (n = 1 * (.3 * 1.5)), i < Math.abs(1) ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), t < 1 ? -.5 * (i * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / n)) : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / n) * .5 + 1)
                }, easeInBack: function (t) {
                    var e = 1.70158;
                    return 1 * (t /= 1) * t * ((e + 1) * t - e)
                }, easeOutBack: function (t) {
                    var e = 1.70158;
                    return 1 * ((t = t / 1 - 1) * t * ((e + 1) * t + e) + 1)
                }, easeInOutBack: function (t) {
                    var e = 1.70158;
                    return (t /= .5) < 1 ? .5 * (t * t * (((e *= 1.525) + 1) * t - e)) : .5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2)
                }, easeInBounce: function (t) {
                    return 1 - n.easeOutBounce(1 - t)
                }, easeOutBounce: function (t) {
                    return (t /= 1) < 1 / 2.75 ? 1 * (7.5625 * t * t) : t < 2 / 2.75 ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                }, easeInOutBounce: function (t) {
                    return t < .5 ? .5 * n.easeInBounce(2 * t) : .5 * n.easeOutBounce(2 * t - 1) + .5
                }
            };
            t.exports = n
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(4),
                o = n(97),
                a = {
                    duration: "duration",
                    destroy: "destroy",
                    delay: "delay",
                    repeat: "repeat",
                    onUpdate: "onUpdate"
                },
                s = r.Matrix3,
                u = {
                    getObjectLength: function (t) {
                        var e, n = 0;
                        for (e in t) t.hasOwnProperty(e) && n++;
                        return n
                    }, isEqual: function (t, e) {
                        var n, r;
                        if (typeof t != typeof e) return !1;
                        if (i.isNumber(t) || i.isString(t)) return t === e;
                        if (i.isArray(t)) {
                            if (!i.isArray(t[0])) return !!i.equalsArray(t, e);
                            if (t === e) return !0;
                            if (t.length !== e.length) return !1;
                            for (n = 0; n < t.length; n++)
                                if (!i.equalsArray(t[n], e[n])) return !1;
                            return !0
                        }
                        if (i.isObject(t)) {
                            if (u.getObjectLength(t) !== u.getObjectLength(e)) return !1;
                            for (r in t) {
                                if (typeof t[r] != typeof e[r]) return !1;
                                if (t[r] !== e[r]) return !1
                            }
                            return !0
                        }
                        return t === e
                    }, interpolation: o.interpolation,
                    getFrame: function (t, e, n, r, o) {
                        var a = {
                                attrs: {},
                                matrix: null
                            },
                            s = n.onUpdate;
                        for (var u in r.attrs) a.attrs[u] = r.attrs[u](t);
                        return r.matrix && (a.matrix = r.matrix(t)), i.isFunction(s) && s(a, t), a
                    }, getInterpolations: function (t, e) {
                        var n, r, o = {
                            attrs: {},
                            matrix: null
                        };
                        return i.each(t.attrs, function (t, a) {
                            n = null, r = e.attrs[a], u.isEqual(t, r) || (n = "path" === a ? u.interpolation({
                                path: t,
                                type: "path"
                            }, {
                                path: r,
                                type: "path"
                            }) : u.interpolation(t, r), i.isFunction(n) && (o.attrs[a] = n))
                        }), e.matrix && t.matrix && !s.equal(t.matrix, e.matrix) && (n = u.interpolation(t.matrix, e.matrix), i.isFunction(n) && (o.matrix = n)), o
                    }, getKeyFrameByProps: function (t, e) {
                        var n = [],
                            i = u.props2frame(t, e),
                            r = {
                                attrs: u.getTargetAttrs(t, i.attrs),
                                matrix: t.getMatrix()
                            };
                        return n[0] = r, n[1] = i, n
                    }, props2frame: function (t, e) {
                        var n = {
                            matrix: null,
                            attrs: {}
                        };
                        return i.each(e, function (i, r) {
                            "transform" !== r || e.k ? "matrix" === r ? n.matrix = i : "onUpdate" === r ? n.onUpdate = e.onUpdate : a[r] || (n.attrs[r] = i) : n.matrix = u.transform(t.getMatrix(), i)
                        }), n
                    }, transform: function (t, e) {
                        return t = t.clone(), i.each(e, function (e) {
                            switch (e[0]) {
                            case "t":
                                t.translate(e[1], e[2]);
                                break;
                            case "s":
                                t.scale(e[1], e[2]);
                                break;
                            case "r":
                                t.rotate(e[1]);
                                break;
                            case "m":
                                t.multiply(e[1]);
                                break;
                            default:
                                return !1
                            }
                        }), t
                    }, getTargetAttrs: function (t, e) {
                        var n, i = {};
                        for (n in e) i[n] = t.attr(n);
                        return i
                    }
                };
            t.exports = u
        },
        function (t, e, n) {
            "use strict";
            var i = (n(11), n(57)),
                r = n(1),
                o = n(56),
                a = function (t) {
                    r.mix(this, t), this._init()
                };
            r.augment(a, {
                type: "tween",
                canvas: null,
                target: null,
                startTime: null,
                endTime: null,
                duration: null,
                ratio: 0,
                destroyTarget: !1,
                needsDestroy: !1,
                available: !0,
                repeat: !1,
                callBack: null,
                currentFrame: null,
                startKeyFrame: {
                    attrs: null,
                    matrix: null
                },
                endKeyFrame: {
                    attrs: null,
                    matrix: null
                },
                interpolations: null,
                _init: function () {
                    var t = this.startTime,
                        e = this.duration;
                    this.endTime = t + e
                }, tryStep: function (t) {
                    var e = (this.startTime, this.duration, this.startKeyFrame, this.target);
                    if (this.currentTime = t, !e || e.get("destroyed")) return this.needsDestroy = !0, !1;
                    try {
                        this.step(t)
                    } catch (t) {
                        return this.needsDestroy = !0, !1
                    }
                }, step: function (t) {
                    var e, n, a, s = this.target,
                        u = this.startTime,
                        c = t - u,
                        h = this.duration,
                        l = this.startKeyFrame,
                        d = this.endKeyFrame,
                        f = this.easing,
                        g = this.interpolations;
                    return r.isFunction(f) || (f = o[f] ? o[f] : o.linear), n = c / h, n = n <= 0 ? 0 : n >= 1 ? 1 : n, a = f(n), e = i.getFrame(a, l, d, g, s), e.attrs && s.attr(e.attrs), e.matrix && s.setMatrix(e.matrix), this.ratio = n, this.currentFrame = e, this.updateStatus(), s
                }, updateStatus: function () {
                    var t = this.ratio,
                        e = this.callBack,
                        n = this.destroyTarget,
                        i = this.target,
                        r = this.repeat;
                    if (t >= 1)
                        if (r) {
                            var o = this.currentTime,
                                a = (this.endTime, this.duration);
                            this.startTime = o, this.endTime = o + a, this.reset()
                        } else this.needsDestroy = !0, e && e.call(i), n && !i.get("destroyed") && i.remove(!0)
                }, reset: function () {
                    var t = this.target,
                        e = this.startKeyFrame;
                    e.attrs && t.attr(e.attrs), e.matrix && t.setMatrix(e.matrix), this.ratio = 0, this.needsDestroy = !1
                }, destroy: function () {
                    var t = this.target,
                        e = this.endKeyFrame;
                    t && !t.get("destroyed") && (e.attrs && t.attr(e.attrs), e.matrix && t.setMatrix(e.matrix)), this.destroyed = !0
                }
            }), t.exports = a
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var r = function () {
                    function t(t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var i = e[n];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                        }
                    }
                    return function (e, n, i) {
                        return n && t(e.prototype, n), i && t(e, i), e
                    }
                }(),
                o = "https://kcart.alipay.com/web/bi.do",
                a = n(1),
                s = function () {
                    function t(e) {
                        i(this, t);
                        var n = this,
                            r = e || {},
                            s = new Image;
                        a.mix(n, {
                            image: s,
                            server: o
                        }, r)
                    }
                    return r(t, [{
                        key: "log",
                        value: function (t) {
                            var e = this,
                                n = t || {},
                                i = a.mix({
                                    pg: document.URL,
                                    r: (new Date).getTime()
                                }, n),
                                r = encodeURIComponent(JSON.stringify([i]));
                            e.image.src = e.server + "?BIProfile=merge&d=" + r
                        }
                    }]), t
                }();
            e.default = s, t.exports = e.default
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                var n = e.get("children");
                a.each(n, function (e) {
                    e.isGroup && e.get("visible") ? i(t, e) : t.push(e)
                })
            }

            function r(t, e, n) {
                for (var i = t.get("parent"); i !== n;) e.push(i), i = i.get("parent")
            }
            var o = n(10).G,
                a = n(3),
                s = o.Group,
                u = function t(e) {
                    t.superclass.constructor.call(this, e)
                };
            a.extend(u, s), a.augment(u, {
                drawInner: function (t) {
                    var e = this,
                        n = [],
                        o = void 0;
                    return i(n, e), a.radixSort(n, function (t) {
                        return t.get("zIndex")
                    }), a.each(n, function (n) {
                        o = [], t.save(), r(n, o, e), a.each(o, function (e) {
                            e.resetTransform(t)
                        }), n.draw(t), t.restore()
                    }), e
                }
            }), t.exports = u
        },
        function (t, e, n) {
            "use strict";
            var i = n(27);
            i.Node = n(129), i.Edge = n(128), t.exports = i
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(11),
                o = ["color", "shape", "size", "label", "tooltip", "style"],
                a = n(130),
                s = "origin",
                u = function t(e) {
                    t.superclass.constructor.call(this, e), this._init()
                };
            u.ATTRS = {
                attrs: null,
                type: null
            }, i.extend(u, r), i.augment(u, {
                _init: function () {
                    this._initAttrs()
                }, _initAttrs: function () {
                    var t = this,
                        e = {};
                    i.each(o, function (t) {
                        e[t] = new a({
                            type: t
                        })
                    }), t.set("attrs", e)
                }, _getAttr: function (t) {
                    return this.get("attrs")[t]
                }, _updateCallbackMappingAttr: function (t, e) {
                    var n = this._getAttr(t);
                    n.mappingType = "custom", n.callback = e
                }, _updateAutoMappingAttr: function (t, e, n) {
                    var i = this._getAttr(t);
                    i.dims = this._parseDims(e), i.callback = n
                }, _parseDims: function (t) {
                    var e = null;
                    return e = i.isArray(t) ? t : i.isString(t) ? t.split("*") : [t]
                }, mapping: function (t) {
                    var e = this,
                        n = e.get("attrs"),
                        r = {};
                    return i.each(n, function (e) {
                        var n = e.type;
                        i.isNull(t[n]) ? r[n] = e.getValue(t) : r[n] = t[n]
                    }), r.x = t.x ? t.x : 0, r.y = t.y ? t.y : 0, r.style = i.mix({}, r.style, t.style), r.labelStyle = t.labelStyle, r[s] = t, r.model = t, r
                }
            }), i.each(o, function (t) {
                u.prototype[t] = function (e, n) {
                    var r = this;
                    return i.isFunction(e) ? r._updateCallbackMappingAttr(t, e) : ("label" !== t || n || (n = function () {
                        return i.toArray(arguments)
                    }), "tooltip" !== t || n || (n = function () {
                        var t = i.toArray(arguments),
                            n = r._parseDims(e),
                            o = [],
                            a = void 0;
                        for (a = 0; a < t.length; a++) o.push([n[a], t[a]]);
                        return o
                    }), r._updateAutoMappingAttr(t, e, n)), r
                }
            }), t.exports = u
        },
        function (t, e, n) {
            "use strict";
            var i = n(29);
            n(141), n(140), t.exports = i
        },
        function (t, e, n) {
            "use strict";

            function i(t) {
                var e = r.mix({}, s.nodeStyle);
                return t.color && (e.stroke = t.color, e.fill = t.color), t.style && r.mix(e, t.style), e
            }
            var r = n(1),
                o = n(146),
                a = n(31),
                s = n(7);
            t.exports = {
                drawNode: function (t, e, n) {
                    var r = i(e),
                        a = o[t](e, n, r);
                    return "text" !== t && "html" !== t && a.attr(r), a.set("zIndex", s.zIndex.node), a.set("class", "node-key-shape"), a
                }, getSnapAnchor: function (t, e) {
                    if (!t || !e) return !1;
                    var n = t.getCenter(),
                        i = t.getAnchorPoints(),
                        o = a.vector(n, e),
                        s = 1 / 0,
                        u = void 0,
                        c = void 0,
                        h = void 0;
                    return r.each(i, function (t) {
                        h = a.vector(n, t), u = o.angleTo(h), u > Math.PI && (u = 2 * Math.PI - u), u < s && (s = u, c = t)
                    }), c
                }
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2);
            i.buttonPointer = function (t) {
                t._on("mouseenter", function (e) {
                    var n = e.shape;
                    n && n.hasClass("Button") && t.css({
                        cursor: "pointer"
                    })
                }), t._on("mouseleave", function (e) {
                    var n = e.shape;
                    n && n.hasClass("Button") && t.css({
                        cursor: "default"
                    })
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = function () {};
            i.clickFocus = r, t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(19);
            i.dragBlank = function (t) {
                r(t, !0)
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(3),
                o = n(66),
                a = function (t) {
                    var e = 1,
                        n = 1.05,
                        i = t.get("rootGroup"),
                        o = i.get("canvas"),
                        a = setTimeout(function () {}, 100),
                        s = t.get("wheelScaleLimit"),
                        u = void 0,
                        c = void 0,
                        h = void 0,
                        l = void 0;
                    t._on("mousewheel", function (d) {
                        var f = t.get("domFocus");
                        if (f && (u = d.domEvent, u.preventDefault(), c = u.wheelDelta, Math.abs(c) > 10)) {
                            if (h = o.getPointByClient(u.clientX, u.clientY), h = {
                                x: h.x / o.get("pixelRatio"),
                                y: h.y / o.get("pixelRatio")
                            }, l = i.getMatrix().clone(), c > 0 ? (e *= n, r.scaleMatrix(n, h, l)) : (e /= n, r.scaleMatrix(1 / n, h, l)), !r.isBetween(l.elements[0], s[0], s[1])) return;
                            t.setCapture(!1), t.updateMatrix(l), t.refresh(), t.fire("wheelzoom", r.mix({
                                scale: l.elements[0]
                            }, d)), clearTimeout(a), a = setTimeout(function () {
                                t.setCapture(!0), t.fire("wheelzoomend", r.mix({
                                    scale: l.elements[0]
                                }, d)), t.draw(!1)
                            }, 60)
                        }
                    })
                };
            a.dependences = [o], i.wheelZoom = a
        },
        function (t, e, n) {
            "use strict";
            var i = {
                CompactBoxTree: n(178),
                Dendrogram: n(183),
                IndentedTree: n(184),
                LayeredTidyTree: n(185),
                TreeLayout: n(14),
                Flow: n(173),
                Force: n(174),
                Linear: n(70),
                Sankey: n(71)
            };
            t.exports = i
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = function (t) {
                    i.mix(this, t), this._init()
                };
            i.augment(r, {
                nodes: null,
                edges: null,
                y: 0,
                hasWeight: !1,
                idField: "name",
                valueField: "value",
                sourceField: "source",
                targetField: "target",
                sourceWeightField: "sourceWeight",
                targetWeightField: "targetWeight",
                maxValue: null,
                thickness: .05,
                margin: .01,
                detachment: !1,
                _init: function () {
                    var t = this,
                        e = t.nodes,
                        n = t.valueField,
                        r = t.targetWeightField;
                    if (i.isNull(e)) {
                        var o = t.edges.slice(0);
                        t.edges = o, i.isNull(o[0][r]) && (t.targetWeightField = t.sourceWeightField), e = t._createNodes()
                    } else e = e.slice(0), t.nodes = e;
                    t.hasWeight && i.isNull(e[0][n]) && (t._initNodeMap(), t._calculateValue()), t._setMarginWidth(e)
                }, _createNodes: function () {
                    var t = this,
                        e = t.edges,
                        n = t.sourceField,
                        i = t.targetField,
                        r = [],
                        o = {};
                    return e.forEach(function (e) {
                        var a = e[n],
                            s = e[i];
                        t._creatNode(a, o, r), t._creatNode(s, o, r)
                    }), t.nodes = r, r
                }, _creatNode: function (t, e, n) {
                    if (i.isNull(e[t])) {
                        var r = {
                            id: t
                        };
                        n.push(r), e[t] = r
                    }
                }, _initNodeMap: function () {
                    var t = this,
                        e = t.idField,
                        n = t.targetField,
                        r = t.sourceField,
                        o = t.nodes;
                    if (i.isObject(o)) return o;
                    var a = {};
                    return i.each(o, function (o) {
                        i.isNull(o.id) && (o.id = o[e]), i.isNull(o.y) || delete o.y, o.inEdges = t._getEdgeOfCurNode(o, n), o.outEdges = t._getEdgeOfCurNode(o, r), a[o.id] = o
                    }), t.nodesMap = a, t.nodes = o, a
                }, _getEdgeOfCurNode: function (t, e) {
                    var n = this.edges,
                        i = n.filter(function (n) {
                            return n[e] === t.id
                        });
                    return i
                }, _calculateValue: function () {
                    var t = this,
                        e = t.nodes,
                        n = t.valueField;
                    e.forEach(function (e) {
                        i.isNull(e[n]) && t._getValueFromEdges(e)
                    })
                }, _getValueFromEdges: function (t) {
                    var e = this.valueField,
                        n = this.sourceField,
                        i = this.targetField,
                        r = this.sourceWeightField,
                        o = this.targetWeightField,
                        a = 0,
                        s = this.detachment;
                    if (s) {
                        var u = 0,
                            c = 0;
                        t.outEdges.forEach(function (t) {
                            c += t[r]
                        }), t.inEdges.forEach(function (t) {
                            u += t[o]
                        }), a = Math.max(u, c)
                    } else t.outEdges.forEach(function (t) {
                        a += t[r]
                    }), t.inEdges.forEach(function (t) {
                        t[n] !== t[i] && (a += t[o])
                    });
                    return t[e] = a, a
                }, _setMarginWidth: function (t) {
                    var e = this.margin,
                        n = t.length,
                        i = 2 * n * e;
                    this.marginWidth = i
                }, getNodes: function () {
                    var t = this,
                        e = t.nodes;
                    return t.hasWeight ? t._layoutByWeight(e) : t._layout(e), e
                }, _layout: function (t) {
                    var e = t.length,
                        n = 1 / e,
                        i = this.y;
                    t.map(function (t, e) {
                        return t.x = (e + .5) * n, t.y = i, !0
                    })
                }, _layoutByWeight: function (t) {
                    var e = this.y,
                        n = this.marginWidth,
                        i = this.thickness,
                        r = this.valueField,
                        o = 0;
                    t.forEach(function (t) {
                        o += t[r]
                    });
                    var a = this.maxValue || o;
                    t.map(function (t) {
                        return t.weight = t[r] / a, t.width = t.weight * (1 - n), t.height = i, t.y = e, !0
                    }), this._layoutX(t)
                }, _layoutX: function (t) {
                    var e = this.margin;
                    t.map(function (n, i) {
                        for (var r = 0, o = i - 1; o >= 0; o--) r += t[o].width + 2 * e;
                        return n.x = e + .5 * n.width + r, !0
                    })
                }, reset: function () {
                    this._init()
                }
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(187),
                o = n(188),
                a = n(70),
                s = function (t) {
                    i.mix(this, t), this._init()
                };
            i.extend(s, a), i.augment(s, {
                hasWeight: !0,
                stepField: "step",
                totalStep: 0,
                calculationTimes: 2,
                _init: function () {
                    var t = this.edges.slice(0);
                    this.edges = t, this._initNode()
                }, _initNode: function () {
                    var t = this,
                        e = t.nodes,
                        n = t.stepField,
                        r = t.valueField;
                    i.isNull(e) ? e = t._createNodes() : (e = e.slice(0), t.nodes = e), t._initNodeMap(), i.isNull(e[0][n]) && t._calculateStep(), i.isNull(e[0][r]) && t._calculateValue()
                }, _calculateStep: function () {
                    var t = this,
                        e = t.nodes,
                        n = t.stepField;
                    e.forEach(function (e) {
                        i.isNull(e[n]) && t._getStepFromEdges(e)
                    });
                    var r = e.filter(function (t) {
                        return 0 === t.outEdges.length
                    });
                    r.map(function (e) {
                        return e.step = t.totalStep - 1, !0
                    })
                }, _getValueFromEdges: function (t) {
                    var e = this.valueField,
                        n = 0,
                        i = t.step;
                    return 0 === i ? t.outEdges.forEach(function (t) {
                        n += t[e]
                    }) : t.inEdges.forEach(function (t) {
                        n += t[e]
                    }), t.value = n, n
                }, _getStepFromEdges: function (t) {
                    var e = this,
                        n = e.sourceField,
                        r = 0;
                    return t.inEdges.length > 0 && t.inEdges.forEach(function (t) {
                        var o = e._findObj(t[n]),
                            a = void 0;
                        a = i.isNull(o.step) ? e._getStepFromEdges(o) : o.step, r = Math.max(a + 1, r)
                    }), t.step = r, e.totalStep = Math.max(e.totalStep, r + 1), r
                }, _findObj: function (t) {
                    var e = this.nodesMap;
                    return e[t]
                }, getNodes: function () {
                    var t = this,
                        e = t.nodes,
                        n = t.sourceField,
                        r = t.targetField,
                        o = t.stepField,
                        a = t.valueField,
                        s = [],
                        u = [],
                        c = [];
                    e.forEach(function (t) {
                        var e = t[o];
                        void 0 === u[e] && (u[e] = []), u[e].push(t), i.isNull(s[e]) ? s[e] = t[a] : s[e] += t[a]
                    }), t.maxValue = Math.max.apply(null, s), t.totalStep = u.length, t._setMarginWidth(u[0]), t._layoutByWeight(u[0]), t._layoutNodes(u, n);
                    for (var h = t.calculationTimes; h > 0; h--) t._layoutNodes(u.reverse(), r), t._layoutNodes(u.reverse(), n);
                    return u.forEach(function (t) {
                        c = c.concat(t)
                    }), t.normalization(c), c
                }, normalization: function (t) {
                    var e = 1;
                    t.forEach(function (t) {
                        t.x > e && (e = t.x)
                    }), e > 1 && t.map(function (t) {
                        return t.x = t.x / e, t.width = t.width / e, !0
                    })
                }, _layoutNodes: function (t, e) {
                    var n = this;
                    if (t.length >= 2) {
                        var i = void 0;
                        for (i = 1; i < t.length; i++) n.y = i / (n.totalStep - 1), n._layoutHighStep(t[i], e), t[i].sort(function (t, e) {
                            return t.x - e.x
                        }), n._handleConflict(t[i]);
                        n._layoutX(t[i - 1])
                    }
                }, _handleConflict: function (t) {
                    var e = this.margin;
                    t.map(function (n, i) {
                        return i > 0 && n.x - .5 * n.width <= t[i - 1].x + .5 * t[i - 1].width + 2 * e && (n.x = t[i - 1].x + .5 * t[i - 1].width + 2 * e + .5 * n.width), !0
                    })
                }, _layoutHighStep: function (t, e) {
                    var n = this,
                        i = n.valueField,
                        r = n.maxValue,
                        o = n.thickness,
                        a = n.marginWidth,
                        s = n.y,
                        u = e === n.sourceField ? n.targetField : n.sourceField;
                    t.map(function (t) {
                        var c = n._getEdgeOfCurNode(t, u),
                            h = 0,
                            l = void 0;
                        return c.forEach(function (r) {
                            l = n._findObj(r[e]);
                            var o = r[i];
                            h += l.x * o / t[i]
                        }), t.x = h, t.weight = t[i] / r, t.width = t.weight * (1 - a), t.height = o, t.y = void 0 === t.y ? s : t.y, !0
                    })
                }, getEdges: function () {
                    for (var t = this.calculationTimes; t > 0; t--) this._layoutEdges();
                    return this.edges
                }, _layoutEdges: function () {
                    var t = this,
                        e = t.nodes,
                        n = t.stepField,
                        i = t.targetField,
                        r = t.sourceField,
                        o = t.totalStep;
                    e.forEach(function (e) {
                        0 !== e[n] && t._edgeSort(e.inEdges, r)
                    }), e.forEach(function (e) {
                        e[n] !== o && t._edgeSort(e.outEdges, i)
                    })
                }, _edgeSort: function (t, e) {
                    var n = this,
                        i = n.edges;
                    t.sort(function (t, i) {
                        return n._findObj(t[e]).x - n._findObj(i[e]).x
                    }), t.forEach(function (a, s) {
                        for (var u = 0; u < s; u++) {
                            var c = n._findIndex(i, t[u]),
                                h = n._findIndex(i, a);
                            n._findObj(t[u][e]).x > n._findObj(a[e]).x ? o(i, h, c) : r(i, h, c)
                        }
                    })
                }, _findIndex: function (t, e) {
                    var n = this.sourceField,
                        i = this.targetField,
                        r = t.findIndex(function (t) {
                            return t[n] === e[n] && t[i] === e[i]
                        });
                    return r
                }
            }), t.exports = s
        },
        function (t, e) {
            "use strict";

            function n(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function i(t, e, n) {
                n ? t.y += e : t.x += e, t.children.forEach(function (t) {
                    i(t, e, n)
                })
            }

            function r(t, e) {
                var n = e ? t.y : t.x;
                return t.children.forEach(function (t) {
                    n = Math.min(r(t, e), n)
                }), n
            }

            function o(t, e) {
                var n = r(t, e);
                i(t, -n, e)
            }

            function a(t, e, n) {
                n ? e.y = t.x : e.x = t.x, t.c.forEach(function (t, i) {
                    a(t, e.children[i], n)
                })
            }

            function s(t, e) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                e ? (t.x = n, n += t.width) : (t.y = n, n += t.height), t.children.forEach(function (t) {
                    s(t, e, n)
                })
            }
            var u = function t(e, i, r) {
                var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
                n(this, t);
                var a = this;
                a.w = e || 0, a.h = i || 0, a.y = r || 0, a.x = 0, a.c = o || [], a.cs = o.length, a.prelim = 0, a.mod = 0, a.shift = 0, a.change = 0, a.tl = null, a.tr = null, a.el = null, a.er = null, a.msel = 0, a.mser = 0
            };
            u.fromNode = function (t, e) {
                if (!t) return null;
                var n = [];
                return t.children.forEach(function (t) {
                    n.push(u.fromNode(t, e))
                }), e ? new u(t.height, t.width, t.x, n) : new u(t.width, t.height, t.y, n)
            }, t.exports = function (t) {
                function e(t) {
                    if (0 === t.cs) return void n(t);
                    e(t.c[0]);
                    for (var r = x(l(t.c[0].el), 0, null), o = 1; o < t.cs; ++o) {
                        e(t.c[o]);
                        var a = l(t.c[o].er);
                        i(t, o, r), r = x(a, o, r)
                    }
                    g(t), n(t)
                }

                function n(t) {
                    0 === t.cs ? (t.el = t, t.er = t, t.msel = t.mser = 0) : (t.el = t.c[0].el, t.msel = t.c[0].msel, t.er = t.c[t.cs - 1].er, t.mser = t.c[t.cs - 1].mser)
                }

                function i(t, e, n) {
                    for (var i = t.c[e - 1], o = i.mod, a = t.c[e], s = a.mod; null !== i && null !== a;) {
                        l(i) > n.low && (n = n.nxt);
                        var u = o + i.prelim + i.w - (s + a.prelim);
                        u > 0 && (s += u, r(t, e, n.index, u));
                        var g = l(i),
                            p = l(a);
                        g <= p && (i = h(i), null !== i && (o += i.mod)), g >= p && (a = c(a), null !== a && (s += a.mod))
                    }!i && a ? d(t, e, a, s) : i && !a && f(t, e, i, o)
                }

                function r(t, e, n, i) {
                    t.c[e].mod += i, t.c[e].msel += i, t.c[e].mser += i, v(t, e, n, i)
                }

                function c(t) {
                    return 0 === t.cs ? t.tl : t.c[0]
                }

                function h(t) {
                    return 0 === t.cs ? t.tr : t.c[t.cs - 1]
                }

                function l(t) {
                    return t.y + t.h
                }

                function d(t, e, n, i) {
                    var r = t.c[0].el;
                    r.tl = n;
                    var o = i - n.mod - t.c[0].msel;
                    r.mod += o, r.prelim -= o, t.c[0].el = t.c[e].el, t.c[0].msel = t.c[e].msel
                }

                function f(t, e, n, i) {
                    var r = t.c[e].er;
                    r.tr = n;
                    var o = i - n.mod - t.c[e].mser;
                    r.mod += o, r.prelim -= o, t.c[e].er = t.c[e - 1].er, t.c[e].mser = t.c[e - 1].mser
                }

                function g(t) {
                    t.prelim = (t.c[0].prelim + t.c[0].mod + t.c[t.cs - 1].mod + t.c[t.cs - 1].prelim + t.c[t.cs - 1].w) / 2 - t.w / 2
                }

                function p(t, e) {
                    e += t.mod, t.x = t.prelim + e, m(t);
                    for (var n = 0; n < t.cs; n++) p(t.c[n], e)
                }

                function v(t, e, n, i) {
                    if (n !== e - 1) {
                        var r = e - n;
                        t.c[n + 1].shift += i / r, t.c[e].shift -= i / r, t.c[e].change -= i - i / r
                    }
                }

                function m(t) {
                    for (var e = 0, n = 0, i = 0; i < t.cs; i++) e += t.c[i].shift, n += e + t.c[i].change, t.c[i].mod += n
                }

                function x(t, e, n) {
                    for (; null !== n && t >= n.low;) n = n.nxt;
                    return {
                        low: t,
                        index: e,
                        nxt: n
                    }
                }
                var y = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    w = y.isHorizontal;
                s(t, w);
                var b = u.fromNode(t, w);
                return e(b), p(b, 0), a(b, t, w), o(t, w), t
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(33);
            t.exports = function (t, e) {
                for (var n = new i(t.data, e, !0), r = new i(t.data, e, !0), o = t.children.length, a = Math.round(o / 2), s = 0; s < o; s++) {
                    var u = t.children[s];
                    s < a ? r.children.push(u) : n.children.push(u)
                }
                return {
                    left: n,
                    right: r
                }
            }
        },
        function (t, e, n) {
            "use strict";

            function i(t, e, n, i) {
                i.forceAlign ? t.align = i.forceAlign : !t.isRoot() || "H" !== i.direction && "V" !== i.direction ? t.align = t.isLeaf() ? o(n) : n : t.align = i.isHorizontal ? "CH" : "CV", t.inAnchor = r[e], t.outAnchor = r[n]
            }
            var r = n(179),
                o = n(186);
            t.exports = function (t, e, n) {
                var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                    o = arguments[4];
                o ? i(t, e, n, r) : t.eachNode(function (t) {
                    i(t, e, n, r)
                })
            }
        },
        function (t, e) {
            "use strict";
            t.exports = "1.2.8"
        },
        function (t, e, n) {
            var i = n(77);
            i.Util = n(34), t.exports = i
        },
        function (t, e, n) {
            "use strict";

            function i(t, e, n, i) {
                var r = t[i] + (e[i] - t[i]) * n;
                return r
            }
            var r = n(34),
                o = n(1),
                a = {
                    calColor: function (t, e, n) {
                        var o, a = t.length - 1,
                            s = Math.floor(a * e),
                            u = a * e - s,
                            c = t[s],
                            h = s === a ? c : t[s + 1];
                        return "hsl" === n ? o = r.hsl2Rgb([i(c, h, u, 0), i(c, h, u, 1), i(c, h, u, 2)]) : (o = {
                            r: i(c, h, u, 0),
                            g: i(c, h, u, 1),
                            b: i(c, h, u, 2)
                        }, o = "#" + r.toHex(o.r) + r.toHex(o.g) + r.toHex(o.b)), o
                    }, lightness: function (t, e) {
                        e = e || 0;
                        var n = [
                            [e, 1, .9],
                            [e, 1, .5]
                        ];
                        return a.calColor(n, t, "hsl")
                    }, red: function (t) {
                        return a.lightness(t, 0)
                    }, blue: function (t) {
                        return a.lightness(t, .66)
                    }, green: function (t) {
                        return a.lightness(t, .33)
                    }, gradient: function (t) {
                        var e = [];
                        return o.isString(t) && (t = t.split("-")), o.each(t, function (t) {
                                t.indexOf("#") === -1 && (t = r.toRGB(t)), e.push(r.rgb2arr(t))
                            }),
                            function (t) {
                                return a.calColor(e, t)
                            }
                    }, gradientHsl: function (t) {
                        var e = [];
                        return o.isString(t) && (t = t.split("-")), o.each(t, function (t) {
                                t.indexOf("#") === -1 && (t = r.toRGB(t)), e.push(r.rgb2hsl(t))
                            }),
                            function (t) {
                                return a.calColor(e, t, "hsl")
                            }
                    }, saturation: function (t, e) {
                        e = e || 0;
                        var n = [
                            [e, 0, .5],
                            [e, 1, .5]
                        ];
                        return a.calColor(n, t, "hsl")
                    }, hue: function (t) {
                        var e = [
                            [0, 1, .5],
                            [1, 1, .5]
                        ];
                        return a.calColor(e, t, "hsl")
                    }, brightness: function (t) {
                        var e = [
                            [255, 255, 255],
                            [0, 0, 0]
                        ];
                        return a.calColor(e, t)
                    }, heat: function (t) {
                        var e = [
                            [255, 255, 255],
                            [255, 127.5, 0],
                            [0, 0, 0]
                        ];
                        return a.calColor(e, t)
                    }, rainbow: function (t) {
                        var e = [
                            [0, 255, 255],
                            [0, 0, 255],
                            [0, 255, 0],
                            [255, 0, 0]
                        ];
                        return a.calColor(e, t)
                    }, circular: function (t) {
                        var e = [
                            [0, 0, 255],
                            [0, 255, 0],
                            [255, 255, 0],
                            [255, 0, 0],
                            [0, 0, 255]
                        ];
                        return a.calColor(e, t)
                    }, bipolar: function (t) {
                        var e = [
                            [0, 255, 0],
                            [0, 0, 0],
                            [255, 0, 0]
                        ];
                        return a.calColor(e, t)
                    }
                };
            t.exports = a
        },
        function (t, e, n) {
            "use strict";

            function i(t) {
                if (!t._attrs && t !== r) {
                    var e = t.superclass.constructor;
                    e && !e._attrs && i(e), t._attrs = {}, o.mix(!0, t._attrs, e._attrs), o.mix(!0, t._attrs, t.ATTRS)
                }
            }
            var r, o = n(1);
            r = function (t) {
                i(this.constructor), this._attrs = {}, this.events = {};
                var e = this.getDefaultCfg();
                o.mix(this._attrs, e, t)
            }, o.augment(r, {
                getDefaultCfg: function () {
                    var t = this,
                        e = t.constructor,
                        n = e._attrs,
                        i = o.mix(!0, {}, n);
                    return i
                }, set: function (t, e) {
                    var n = "_onRender" + o.ucfirst(t);
                    return this[n] && this[n](e, this._attrs[t]), this._attrs[t] = e, this
                }, get: function (t) {
                    return this._attrs[t]
                }, on: function (t, e) {
                    var n = this,
                        i = n.events,
                        r = i[t];
                    return r || (r = i[t] = []), r.push(e), n
                }, fire: function (t, e) {
                    var n = this,
                        i = n.events,
                        r = i[t];
                    r && o.each(r, function (t) {
                        t(e)
                    })
                }, off: function (t, e) {
                    var n = this,
                        i = n.events,
                        r = i[t];
                    return t ? (r && o.remove(r, e), n) : (n.events = {}, n)
                }, offEvents: function (t) {
                    var e = this,
                        n = e.events;
                    return t ? (n[t] = null, e) : (e.events = {}, e)
                }, destroy: function () {
                    var t = this,
                        e = t.destroyed;
                    return e ? t : (t._attrs = {}, t.events = {}, void(t.destroyed = !0))
                }
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(54),
                r = n(82),
                o = n(38),
                a = function (t) {
                    a.superclass.constructor.call(this, t)
                };
            a.CFG = {
                eventEnable: !0,
                width: null,
                height: null,
                widthCanvas: null,
                heightCanvas: null,
                widthStyle: null,
                heightStyle: null,
                containerDOM: null,
                canvasDOM: null,
                pixelRatio: null
            }, i.extend(a, o.Group), i.augment(a, {
                init: function () {
                    a.superclass.init.call(this), this._setGlobalParam(), this._setDOM(), this._setInitSize(), this._setCanvas(), this._scale(), this.get("eventEnable") && this._registEvents()
                }, _registEvents: function () {
                    var t = this,
                        e = t.get("el"),
                        n = new r(t);
                    e.addEventListener("mouseout", function (t) {
                        n.mouseout(t)
                    }, !1), e.addEventListener("mouseover", function (t) {
                        n.mouseover(t)
                    }, !1), e.addEventListener("mousemove", function (t) {
                        n.mousemove(t)
                    }, !1), e.addEventListener("mousedown", function (t) {
                        n.mousedown(t)
                    }, !1), e.addEventListener("mouseup", function (t) {
                        n.mouseup(t)
                    }, !1), e.addEventListener("click", function (t) {
                        n.click(t)
                    }, !1), e.addEventListener("dblclick", function (t) {
                        n.dblclick(t)
                    }, !1)
                }, _scale: function () {
                    var t = this.get("pixelRatio");
                    this.scale(t, t)
                }, _setCanvas: function () {
                    var t = this.get("canvasDOM");
                    this.set("el", t), this.set("context", t.getContext("2d")), this.set("canvas", this)
                }, _setGlobalParam: function () {
                    var t = this.get("pixelRatio");
                    t || this.set("pixelRatio", i.getRatio())
                }, _setDOM: function () {
                    this._setContainer(), this._setLayer()
                }, _setContainer: function () {
                    var t = this.get("containerId"),
                        e = this.get("containerDOM");
                    e || (e = document.getElementById(t), this.set("containerDOM", e)), i.modiCSS(e, {
                        position: "relative"
                    })
                }, _setLayer: function () {
                    var t = this.get("containerDOM"),
                        e = i.guid("canvas_");
                    if (t) {
                        var n = i.createDom('<canvas id="' + e + '"></canvas>');
                        t.appendChild(n), this.set("canvasDOM", n)
                    }
                }, _setInitSize: function () {
                    this.get("widthStyle") ? this.changeSizeByCss(this.get("widthStyle"), this.get("heightStyle")) : this.get("width") && this.changeSize(this.get("width"), this.get("height"))
                }, _getPx: function (t, e) {
                    var n = this.get("canvasDOM");
                    n.style[t] = e;
                    var r = i.getBoundingClientRect(n);
                    return "width" === t ? r.right - r.left : "height" === t ? r.bottom - r.top : void 0
                }, _reSize: function () {
                    var t = this.get("canvasDOM"),
                        e = this.get("widthCanvas"),
                        n = this.get("heightCanvas"),
                        i = this.get("widthStyle"),
                        r = this.get("heightStyle");
                    t.style.width = i, t.style.height = r, t.setAttribute("width", e), t.setAttribute("height", n)
                }, getWidth: function () {
                    var t = this.get("pixelRatio"),
                        e = this.get("width");
                    return e * t
                }, getHeight: function () {
                    var t = this.get("pixelRatio"),
                        e = this.get("height");
                    return e * t
                }, changeSizeByCss: function (t, e) {
                    var n = this.get("pixelRatio");
                    t = this._getPx("width", t), e = this._getPx("height", e);
                    var i = t * n,
                        r = e * n;
                    this.set("widthStyle", t), this.set("heightStyle", e), this.set("widthCanvas", i), this.set("heightCanvas", r), this.set("width", t), this.set("height", e), this._reSize()
                }, changeSize: function (t, e) {
                    var n = this.get("pixelRatio"),
                        i = t * n,
                        r = e * n;
                    this.set("widthCanvas", i), this.set("heightCanvas", r), this.set("widthStyle", t + "px"), this.set("heightStyle", e + "px"), this.set("width", t), this.set("height", e), this._reSize()
                }, getPointByClient: function (t, e) {
                    var n = this.get("el"),
                        i = n.getBoundingClientRect(),
                        r = i.right - i.left,
                        o = i.bottom - i.top;
                    return {
                        x: (t - i.left) * (n.width / r),
                        y: (e - i.top) * (n.height / o)
                    }
                }, getClientByPoint: function (t, e) {
                    var n = this.get("el"),
                        i = n.getBoundingClientRect(),
                        r = i.right - i.left,
                        o = i.bottom - i.top;
                    return {
                        clientX: t / (n.width / r) + i.left,
                        clientY: e / (n.height / o) + i.top
                    }
                }, beforeDraw: function () {
                    var t = this.get("context"),
                        e = this.get("el");
                    t && t.clearRect(0, 0, e.width, e.height)
                }, _beginDraw: function () {
                    this.setSilent("toDraw", !0)
                }, _endDraw: function () {
                    this.setSilent("toDraw", !1)
                }, draw: function () {
                    function t() {
                        e.set("animateHandler", i.requestAnimationFrame(function () {
                            e.set("animateHandler", void 0), e.get("toDraw") && t()
                        })), e.beforeDraw();
                        try {
                            var n = e.get("context");
                            a.superclass.draw.call(e, n)
                        } catch (t) {
                            console.warn("error in draw canvas, detail as:"), console.warn(t), e._endDraw()
                        }
                        e._endDraw()
                    }
                    var e = this;
                    e.get("destroyed") || (e.get("animateHandler") ? this._beginDraw() : t())
                }, destroy: function () {
                    var t = this.get("containerDOM"),
                        e = this.get("canvasDOM");
                    e && t && t.removeChild(e), a.superclass.destroy.call(this)
                }
            }), t.exports = a
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = function (t, e, n, i) {
                    this.type = t, this.target = null, this.currentTarget = null, this.bubbles = n, this.cancelable = i, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.removed = !1,
                        this.event = e
                };
            i.augment(r, {
                preventDefault: function () {
                    this.defaultPrevented = this.cancelable && !0
                }, stopPropagation: function () {
                    this.propagationStopped = !0
                }, remove: function () {
                    this.remove = !0
                }, clone: function () {
                    return i.clone(this)
                }, toString: function () {
                    return "[Event (type=" + this.type + ")]"
                }
            }), t.exports = r
        },
        function (t, e, n) {
            var i = n(1),
                r = n(80);
            t.exports = {
                initEventDispatcher: function () {
                    this.__listeners = {}
                }, on: function (t, e) {
                    var n = this.__listeners;
                    return i.isNull(n[t]) && (n[t] = []), n[t].indexOf(e) === -1 && n[t].push(e), this
                }, off: function (t, e) {
                    var n = this.__listeners;
                    return 0 === arguments.length ? (this.__listeners = {}, this) : 1 === arguments.length && i.isString(t) ? (n[t] = [], this) : 2 === arguments.length && i.isString(t) && i.isFunction(e) ? (i.remove(n[t], e), this) : void 0
                }, has: function (t, e) {
                    var n = this.__listeners;
                    return 0 === arguments.length && !i.isBlank(n) || (!(1 !== arguments.length || !n[t] || i.isBlank(n[t])) || !(2 !== arguments.length || !n[t] || n[t].indexOf(e) === -1))
                }, trigger: function (t) {
                    var e = this,
                        n = e.__listeners,
                        r = n[t.type];
                    if (t.target = e, i.notNull(r) && r.forEach(function (n) {
                        n.call(e, t)
                    }), t.bubbles) {
                        var o = e.get("parent");
                        o && !t.propagationStopped && o.trigger(t)
                    }
                    return e
                }, fire: function (t, e) {
                    var n = new r(t);
                    i.each(e, function (t, e) {
                        n[e] = t
                    }), this.trigger(n)
                }
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(95),
                o = function (t) {
                    this.canvas = t, this.el = t.get("el"), this.current = null, this.pre = null
                };
            i.augment(o, {
                tryTrigger: function (t, e) {
                    t.__listeners && t.trigger(e)
                }, getCurrent: function (t) {
                    var e = this.canvas,
                        n = e.getPointByClient(t.clientX, t.clientY);
                    this.point = n, this.pre = this.current, this.current = e.getShape(n.x, n.y)
                }, mousemove: function (t) {
                    this.getCurrent(t);
                    var e = this.point,
                        n = this.canvas;
                    if (n.has("canvas-mousemove")) {
                        var i = new r("canvas-mousemove", t, !0, !0);
                        i.x = e.x, i.y = e.y, i.clientX = t.clientX, i.clientY = t.clientY, i.currentTarget = n, this.tryTrigger(n, i)
                    }
                    if (this.pre && this.pre !== this.current) {
                        var o = new r("mouseleave", t, !0, !0);
                        o.x = e.x, o.y = e.y, o.clientX = t.clientX, o.clientY = t.clientY, o.currentTarget = this.pre, o.target = this.pre, this.tryTrigger(this.pre, o)
                    }
                    if (this.current) {
                        var a = new r("mousemove", t, !0, !0);
                        if (a.x = e.x, a.y = e.y, a.clientX = t.clientX, a.clientY = t.clientY, a.currentTarget = this.current, a.target = this.current, this.tryTrigger(this.current, a), this.pre !== this.current) {
                            var s = new r("mouseenter", t, !0, !0);
                            s.x = e.x, s.y = e.y, s.clientX = t.clientX, s.clientY = t.clientY, s.currentTarget = this.current, s.target = this.current, this.tryTrigger(this.current, s)
                        }
                    }
                }, mousedown: function (t) {
                    var e = this.point,
                        n = this.canvas;
                    if (n.has("canvas-mousedown")) {
                        var i = new r("canvas-mousedown", t, !0, !0);
                        i.x = e.x, i.y = e.y, i.clientX = t.clientX, i.clientY = t.clientY, i.currentTarget = n, this.tryTrigger(n, i)
                    }
                    if (this.current) {
                        var o = new r("mousedown", t, !0, !0);
                        o.x = e.x, o.y = e.y, o.clientX = t.clientX, o.clientY = t.clientY, o.currentTarget = this.current, o.target = this.current, this.tryTrigger(this.current, o)
                    }
                }, mouseup: function (t) {
                    var e = this.point,
                        n = this.canvas;
                    if (n.has("canvas-mouseup")) {
                        var i = new r("canvas-mouseup", t, !0, !0);
                        i.x = e.x, i.y = e.y, i.clientX = t.clientX, i.clientY = t.clientY, i.currentTarget = n, this.tryTrigger(n, i)
                    }
                    if (this.current) {
                        var o = new r("mouseup", t, !0, !0);
                        o.x = e.x, o.y = e.y, o.clientX = t.clientX, o.clientY = t.clientY, o.currentTarget = this.current, o.target = this.current, this.tryTrigger(this.current, o)
                    }
                }, click: function (t) {
                    this.getCurrent(t);
                    var e = this.point,
                        n = this.canvas;
                    if (n.has("canvas-click")) {
                        var i = new r("canvas-click", t, !0, !0);
                        i.x = e.x, i.y = e.y, i.clientX = t.clientX, i.clientY = t.clientY, i.currentTarget = n, this.tryTrigger(n, i)
                    }
                    if (this.current) {
                        var o = new r("click", t, !0, !0);
                        o.x = e.x, o.y = e.y, o.clientX = t.clientX, o.clientY = t.clientY, o.currentTarget = this.current, o.target = this.current, this.tryTrigger(this.current, o)
                    }
                }, dblclick: function (t) {
                    var e = this.point,
                        n = this.canvas;
                    if (n.has("canvas-dblclick")) {
                        var i = new r("canvas-dblclick", t, !0, !0);
                        i.x = e.x, i.y = e.y, i.clientX = t.clientX, i.clientY = t.clientY, i.currentTarget = n, this.tryTrigger(n, i)
                    }
                    if (this.current) {
                        var o = new r("dblclick", t, !0, !0);
                        o.x = e.x, o.y = e.y, o.clientX = t.clientX, o.clientY = t.clientY, o.currentTarget = this.current, o.target = this.current, this.tryTrigger(this.current, o)
                    }
                }, mouseout: function (t) {
                    var e = this.point,
                        n = this.canvas,
                        i = new r("canvas-mouseleave", t, !0, !0);
                    i.x = e.x, i.y = e.y, i.currentTarget = n, this.tryTrigger(n, i)
                }, mouseover: function (t) {
                    var e = this.canvas,
                        n = new r("canvas-mouseenter", t, !0, !0);
                    n.currentTarget = e, this.tryTrigger(e, n)
                }
            }), t.exports = o
        },
        function (t, e, n) {
            function i(t, e, n) {
                for (var i, r = t.length - 1; r >= 0; r--) {
                    var o = t[r];
                    if (o.__cfg.visible && o.__cfg.capture && (o.isGroup ? i = o.getShape(e, n) : o.isHit(e, n) && (i = o)), i) break
                }
                return i
            }

            function r(t) {
                if (!t.__cfg && t !== h) {
                    var e = t.superclass.constructor;
                    e && !e.__cfg && r(e), t.__cfg = {}, o.mix(!0, t.__cfg, e.__cfg), o.mix(!0, t.__cfg, t.CFG)
                }
            }
            var o = n(1),
                a = n(4).Vector3,
                s = n(36),
                u = n(45),
                c = {},
                h = function (t) {
                    h.superclass.constructor.call(this, t), this.set("children", []), this._beforeRenderUI(), this._renderUI(), this._bindUI()
                };
            o.extend(h, s), o.augment(h, {
                isGroup: !0,
                canFill: !0,
                canStroke: !0,
                getDefaultCfg: function () {
                    return r(this.constructor), o.mix(!0, {}, this.constructor.__cfg)
                }, _beforeRenderUI: function () {}, _renderUI: function () {}, _bindUI: function () {}, addShape: function (t, e) {
                    var n, i = this.get("canvas");
                    e = e || {};
                    var r = c[t];
                    if (r || (r = o.ucfirst(t), c[t] = r), e.attrs) {
                        var a = e.attrs;
                        if ("text" === t) {
                            var s = i.get("fontFamily");
                            s && (a.fontFamily = a.fontFamily ? a.fontFamily : s)
                        }
                    }
                    return e.canvas = i, e.type = t, n = new u[r](e), this.add(n), n
                }, addGroup: function (t, e) {
                    var n, i = this.get("canvas");
                    if (e = o.mix({}, e), o.isFunction(t)) e ? (e.canvas = i, e.parent = this, n = new t(e)) : n = new t({
                        canvas: i,
                        parent: this
                    }), this.add(n);
                    else if (o.isObject(t)) t.canvas = i, n = new h(t), this.add(n);
                    else {
                        if (void 0 !== t) return !1;
                        n = new h, this.add(n)
                    }
                    return n
                }, renderBack: function (t, e) {
                    var n = this.get("backShape"),
                        i = this.getBBox(),
                        r = this.get("parent");
                    return o.mix(e, {
                        x: i.minX - t[3],
                        y: i.minY - t[0],
                        width: i.width + t[1] + t[3],
                        height: i.height + t[0] + t[2]
                    }), n ? n.attr(e) : n = r.addShape("rect", {
                        zIndex: -1,
                        attrs: e
                    }), this.set("backShape", n), r.sort(), n
                }, removeChild: function (t, e) {
                    if (arguments.length >= 2) this.contain(t) && t.remove(e);
                    else {
                        if (1 === arguments.length) {
                            if (!o.isBoolean(t)) return this.contain(t) && t.remove(!0), this;
                            e = t
                        }
                        0 === arguments.length && (e = !0), h.superclass.remove.call(this, e)
                    }
                    return this
                }, add: function (t) {
                    var e = this,
                        n = e.get("children");
                    if (o.isArray(t)) o.each(t, function (t) {
                        var n = t.get("parent");
                        n && n.removeChild(t, !1), e.__setEvn(t)
                    }), n.push.apply(n, t);
                    else {
                        var i = t,
                            r = i.get("parent");
                        r && r.removeChild(i, !1), e.__setEvn(i), n.push(i)
                    }
                    return e
                }, contain: function (t) {
                    var e = this.get("children");
                    return e.indexOf(t) > -1
                }, getChildByIndex: function (t) {
                    var e = this.get("children");
                    return e[t]
                }, getFirst: function () {
                    return this.getChildByIndex(0)
                }, getLast: function () {
                    var t = this.get("children").length - 1;
                    return this.getChildByIndex(t)
                }, __setEvn: function (t) {
                    var e = this;
                    t.__cfg.parent = e, t.__cfg.context = e.__cfg.context, t.__cfg.canvas = e.__cfg.canvas, t.__cfg.totalMatrix = null;
                    var n = t.__attrs.clip;
                    n && (n.setSilent("parent", e), n.setSilent("context", e.get("context")));
                    var i = t.__cfg.children;
                    i && o.each(i, function (e) {
                        t.__setEvn(e)
                    })
                }, getBBox: function () {
                    var t = this,
                        e = 1 / 0,
                        n = -(1 / 0),
                        i = 1 / 0,
                        r = -(1 / 0),
                        s = t.get("children");
                    o.each(s, function (t) {
                        if (t.get("visible")) {
                            var o = t.getBBox();
                            if (!o) return !0;
                            var s = new a(o.minX, o.minY, 1),
                                u = new a(o.minX, o.maxY, 1),
                                c = new a(o.maxX, o.minY, 1),
                                h = new a(o.maxX, o.maxY, 1);
                            t.apply(s), t.apply(u), t.apply(c), t.apply(h);
                            var l = Math.min(s.x, u.x, c.x, h.x),
                                d = Math.max(s.x, u.x, c.x, h.x),
                                f = Math.min(s.y, u.y, c.y, h.y),
                                g = Math.max(s.y, u.y, c.y, h.y);
                            l < e && (e = l), d > n && (n = d), f < i && (i = f), g > r && (r = g)
                        }
                    });
                    var u = {
                        minX: e,
                        minY: i,
                        maxX: n,
                        maxY: r
                    };
                    return u.x = u.minX, u.y = u.minY, u.width = u.maxX - u.minX, u.height = u.maxY - u.minY, u
                }, drawInner: function (t) {
                    for (var e = this.get("children"), n = 0; n < e.length; n++) {
                        var i = e[n];
                        i.draw(t)
                    }
                    return this
                }, getCount: function () {
                    return this.get("children").length
                }, sort: function () {
                    var t = this.get("children");
                    return t.sort(function (t, e) {
                        return t.get("zIndex") - e.get("zIndex")
                    }), this
                }, find: function (t) {
                    return this.findBy(function (e) {
                        return e.get("id") === t
                    })
                }, findBy: function (t) {
                    var e = this.get("children"),
                        n = null;
                    return o.each(e, function (e) {
                        if (t(e) ? n = e : e.findBy && (n = e.findBy(t)), n) return !1
                    }), n
                }, findAllBy: function (t) {
                    var e = this.get("children"),
                        n = [],
                        i = [];
                    return o.each(e, function (e) {
                        t(e) && n.push(e), e.findAllBy && (i = e.findAllBy(t), n = n.concat(i))
                    }), n
                }, getShape: function (t, e) {
                    var n, r = this,
                        o = r.__attrs.clip,
                        a = r.__cfg.children;
                    return o ? o.inside(t, e) && (n = i(a, t, e)) : n = i(a, t, e), n
                }, clearTotalMatrix: function () {
                    var t = this.get("totalMatrix");
                    if (t) {
                        this.setSilent("totalMatrix", null);
                        for (var e = this.__cfg.children, n = 0; n < e.length; n++) {
                            var i = e[n];
                            i.clearTotalMatrix()
                        }
                    }
                }, clear: function () {
                    for (var t = this.get("children"); 0 !== t.length;) t[t.length - 1].remove();
                    return this
                }, destroy: function () {
                    this.get("destroyed") || (this.clear(), h.superclass.destroy.call(this))
                }
            }), t.exports = h
        },
        function (t, e, n) {
            var i = n(1),
                r = n(55),
                o = new r;
            t.exports = {
                tween: o,
                animate: function (t, e, n, r) {
                    var a = o.getNow(),
                        s = i.mix({}, t, {
                            duration: e
                        });
                    o.animate(this).append(a, s, n, r), "silent" === o.get("status") && o.play()
                }
            }
        },
        function (t, e, n) {
            var i = n(1),
                r = n(4).Vector3,
                o = ["strokeStyle", "fillStyle", "globalAlpha"],
                a = ["circle", "ellipse", "fan", "polygon", "rect", "path"],
                s = {
                    r: "R",
                    opacity: "Opacity",
                    lineWidth: "LineWidth",
                    clip: "Clip",
                    stroke: "Stroke",
                    fill: "Fill",
                    strokeOpacity: "Stroke",
                    fillOpacity: "Fill",
                    x: "X",
                    y: "Y",
                    rx: "Rx",
                    ry: "Ry",
                    re: "Re",
                    rs: "Rs",
                    width: "Width",
                    height: "Height",
                    img: "Img",
                    x1: "X1",
                    x2: "X2",
                    y1: "Y1",
                    y2: "Y2",
                    points: "Points",
                    p1: "P1",
                    p2: "P2",
                    p3: "P3",
                    p4: "P4",
                    text: "Text",
                    radius: "Radius",
                    textAlign: "TextAlign",
                    textBaseline: "TextBaseline",
                    font: "Font",
                    fontSize: "FontSize",
                    fontStyle: "FontStyle",
                    fontVariant: "FontVariant",
                    fontWeight: "FontWeight",
                    fontFamily: "FontFamily",
                    clockwise: "Clockwise",
                    startAngle: "StartAngle",
                    endAngle: "EndAngle",
                    path: "Path"
                },
                u = {
                    stroke: "strokeStyle",
                    fill: "fillStyle",
                    opacity: "globalAlpha"
                };
            t.exports = {
                canFill: !1,
                canStroke: !1,
                initAttrs: function (t) {
                    return this.__attrs = {
                        opacity: 1,
                        fillOpacity: 1,
                        strokeOpacity: 1
                    }, this.attr(i.simpleMix(this.getDefaultAttrs(), t)), this
                }, getDefaultAttrs: function () {
                    return {}
                }, attr: function (t, e) {
                    var n = this;
                    if (0 === arguments.length) return n.__attrs;
                    if (i.isObject(t)) {
                        for (var r in t)
                            if (o.indexOf(r) === -1) {
                                var a = t[r];
                                n._setAttr(r, a)
                            }
                        return n.__afterSetAttrAll && n.__afterSetAttrAll(t), n.clearBBox(), n
                    }
                    if (2 === arguments.length) {
                        if (n._setAttr(t, e) !== !1) {
                            var u = "__afterSetAttr" + s[t];
                            n[u] && n[u](e)
                        }
                        return n.clearBBox(), n
                    }
                    return n._getAttr(t)
                }, clearBBox: function () {
                    this.setSilent("box", null)
                }, __afterSetAttrAll: function () {}, _getAttr: function (t) {
                    return this.__attrs[t]
                }, _setAttr: function (t, e) {
                    var n = this;
                    if ("clip" === t) n.__setAttrClip(e), n.__attrs.clip = e;
                    else {
                        n.__attrs[t] = e;
                        var i = u[t];
                        i && (n.__attrs[i] = e)
                    }
                    return n
                }, hasFill: function () {
                    return this.canFill && this.__attrs.fillStyle
                }, hasStroke: function () {
                    return this.canStroke && this.__attrs.strokeStyle
                }, __setAttrOpacity: function (t) {
                    return this.__attrs.globalAlpha = t, t
                }, __setAttrClip: function (t) {
                    var e = this;
                    return t && a.indexOf(t.type) > -1 ? (null === t.get("canvas") && (t = i.clone(t)), t.set("parent", e.get("parent")), t.set("context", e.get("context")), t.inside = function (n, i) {
                        var o = new r(n, i, 1);
                        return t.invert(o, e.get("canvas")), t.__isPointInFill(o.x, o.y)
                    }, t) : null
                }
            }
        },
        function (t, e, n) {
            function i(t) {
                var e = t.elements;
                return 1 === e[0] && 0 === e[1] && 0 === e[3] && 1 === e[4] && 0 === e[6] && 0 === e[7]
            }

            function r(t) {
                var e = t.elements;
                return 0 === e[1] && 0 === e[3] && 0 === e[6] && 0 === e[7]
            }

            function o(t, e) {
                i(e) || (r(e) ? (t.elements[0] *= e.elements[0], t.elements[4] *= e.elements[4]) : t.multiply(e))
            }
            var a = n(1),
                s = n(4).Matrix3;
            t.exports = {
                initTransform: function () {
                    this.__m = new s
                }, translate: function (t, e) {
                    return this.__m.translate(t, e), this.clearTotalMatrix(), this
                }, rotate: function (t) {
                    return this.__m.rotate(t), this.clearTotalMatrix(), this
                }, scale: function (t, e) {
                    return this.__m.scale(t, e), this.clearTotalMatrix(), this
                }, rotateAtStart: function (t) {
                    var e = this.attr("x"),
                        n = this.attr("y");
                    Math.abs(t) > 2 * Math.PI && (t = t / 180 * Math.PI), this.transform([
                        ["t", -e, -n],
                        ["r", t],
                        ["t", e, n]
                    ])
                }, move: function (t, e) {
                    var n = this.get("x") || 0,
                        i = this.get("y") || 0;
                    this.translate(t - n, e - i), this.set("x", t), this.set("y", e)
                }, transform: function (t) {
                    var e = this;
                    return a.each(t, function (t) {
                        switch (t[0]) {
                        case "t":
                            e.translate(t[1], t[2]);
                            break;
                        case "s":
                            e.scale(t[1], t[2]);
                            break;
                        case "r":
                            e.rotate(t[1]);
                            break;
                        case "m":
                            e.__m = s.multiply(t[1], e.__m), e.clearTotalMatrix()
                        }
                    }), e
                }, setTransform: function (t) {
                    return this.__m.identity(), this.transform(t)
                }, getMatrix: function () {
                    return this.__m
                }, setMatrix: function (t) {
                    return this.__m = t, this.clearTotalMatrix(), this
                }, apply: function (t, e) {
                    var n;
                    return n = e ? this._getMatrixByRoot(e) : this.__m, t.applyMatrix(n), this
                }, _getMatrixByRoot: function (t) {
                    var e = this;
                    t = t || e;
                    for (var n = e, i = []; n !== t;) i.unshift(n), n = n.get("parent");
                    i.unshift(n);
                    var r = new s;
                    return a.each(i, function (t) {
                        r.multiply(t.__m)
                    }), r
                }, getTotalMatrix: function () {
                    var t = this.__cfg.totalMatrix;
                    if (!t) {
                        t = new s;
                        var e = this.__cfg.parent;
                        if (e) {
                            var n = e.getTotalMatrix();
                            o(t, n)
                        }
                        o(t, this.__m), this.__cfg.totalMatrix = t
                    }
                    return t
                }, clearTotalMatrix: function () {}, invert: function (t) {
                    var e = this.getTotalMatrix();
                    if (r(e)) t.x /= e.elements[0], t.y /= e.elements[4];
                    else {
                        var n = e.getInverse();
                        t.applyMatrix(n)
                    }
                    return this
                }, resetTransform: function (t) {
                    var e = this.__m.to2DObject();
                    i(this.__m) || t.transform(e.a, e.b, e.c, e.d, e.e, e.f)
                }
            }
        },
        function (t, e) {
            t.exports = {
                xAt: function (t, e, n, i, r) {
                    return e * Math.cos(t) * Math.cos(r) - n * Math.sin(t) * Math.sin(r) + i
                }, yAt: function (t, e, n, i, r) {
                    return e * Math.sin(t) * Math.cos(r) + n * Math.cos(t) * Math.sin(r) + i
                }, xExtrema: function (t, e, n) {
                    return Math.atan(-n / e * Math.tan(t))
                }, yExtrema: function (t, e, n) {
                    return Math.atan(n / (e * Math.tan(t)))
                }
            }
        },
        function (t, e, n) {
            function i(t, e, n) {
                return {
                    x: n.x + t,
                    y: n.y + e
                }
            }

            function r(t, e) {
                return {
                    x: e.x + (e.x - t.x),
                    y: e.y + (e.y - t.y)
                }
            }

            function o(t) {
                return Math.sqrt(t[0] * t[0] + t[1] * t[1])
            }

            function a(t, e) {
                return (t[0] * e[0] + t[1] * e[1]) / (o(t) * o(e))
            }

            function s(t, e) {
                return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(a(t, e))
            }

            function u(t, e, n, i, r, o, u) {
                var c = h.mod(h.degreeToRad(u), 2 * Math.PI),
                    l = t.x,
                    d = t.y,
                    f = e.x,
                    g = e.y,
                    p = Math.cos(c) * (l - f) / 2 + Math.sin(c) * (d - g) / 2,
                    v = -1 * Math.sin(c) * (l - f) / 2 + Math.cos(c) * (d - g) / 2,
                    m = p * p / (r * r) + v * v / (o * o);
                m > 1 && (r *= Math.sqrt(m), o *= Math.sqrt(m));
                var x = Math.sqrt((r * r * (o * o) - r * r * (v * v) - o * o * (p * p)) / (r * r * (v * v) + o * o * (p * p)));
                n === i && (x *= -1), isNaN(x) && (x = 0);
                var y = x * r * v / o,
                    w = x * -o * p / r,
                    b = (l + f) / 2 + Math.cos(c) * y - Math.sin(c) * w,
                    _ = (d + g) / 2 + Math.sin(c) * y + Math.cos(c) * w,
                    M = s([1, 0], [(p - y) / r, (v - w) / o]),
                    S = [(p - y) / r, (v - w) / o],
                    A = [(-1 * p - y) / r, (-1 * v - w) / o],
                    P = s(S, A);
                return a(S, A) <= -1 && (P = Math.PI), a(S, A) >= 1 && (P = 0), 0 === i && P > 0 && (P -= 2 * Math.PI), 1 === i && P < 0 && (P += 2 * Math.PI), [t, b, _, r, o, M, P, c, i]
            }
            var c = n(1),
                h = n(8),
                l = n(6),
                d = n(15),
                f = n(22),
                g = n(87),
                p = n(4),
                v = p.Vector2,
                m = p.Vector3,
                x = p.Matrix3,
                y = ["m", "l", "c", "a", "q", "h", "v", "t", "s", "z"],
                w = function (t, e, n) {
                    this.preSegment = e, this.isLast = n, this.init(t, e)
                };
            c.augment(w, {
                init: function (t, e) {
                    var n = t[0];
                    e = e || {
                        endPoint: {
                            x: 0,
                            y: 0
                        }
                    };
                    var o, a, s, c, h = y.indexOf(n) >= 0,
                        l = h ? n.toUpperCase() : n,
                        d = t,
                        f = e.endPoint,
                        g = d[1],
                        p = d[2];
                    switch (l) {
                        default: break;
                    case "M":
                        c = h ? i(g, p, f) : {
                            x: g,
                            y: p
                        }, this.command = "M", this.params = [f, c], this.subStart = c, this.endPoint = c;
                        break;
                    case "L":
                        c = h ? i(g, p, f) : {
                            x: g,
                            y: p
                        }, this.command = "L", this.params = [f, c], this.subStart = e.subStart, this.endPoint = c, this.isLast && (this.endTangent = function () {
                            return new v(c.x - f.x, c.y - f.y)
                        });
                        break;
                    case "H":
                        c = h ? i(g, 0, f) : {
                            x: g,
                            y: f.y
                        }, this.command = "L", this.params = [f, c], this.subStart = e.subStart, this.endPoint = c, this.endTangent = function () {
                            return new v(c.x - f.x, c.y - f.y)
                        };
                        break;
                    case "V":
                        c = h ? i(0, g, f) : {
                            x: f.x,
                            y: g
                        }, this.command = "L", this.params = [f, c], this.subStart = e.subStart, this.endPoint = c, this.endTangent = function () {
                            return new v(c.x - f.x, c.y - f.y)
                        };
                        break;
                    case "Q":
                        h ? (o = i(g, p, f), a = i(d[3], d[4], f)) : (o = {
                            x: g,
                            y: p
                        }, a = {
                            x: d[3],
                            y: d[4]
                        }), this.command = "Q", this.params = [f, o, a], this.subStart = e.subStart, this.endPoint = a, this.endTangent = function () {
                            return new v(a.x - o.x, a.y - o.y)
                        };
                        break;
                    case "T":
                        a = h ? i(g, p, f) : {
                            x: g,
                            y: p
                        }, "Q" === e.command ? (o = r(e.params[1], f), this.command = "Q", this.params = [f, o, a], this.subStart = e.subStart, this.endPoint = a, this.endTangent = function () {
                            return new v(a.x - o.x, a.y - o.y)
                        }) : (this.command = "TL", this.params = [f, a], this.subStart = e.subStart, this.endPoint = a, this.endTangent = function () {
                            return new v(a.x - f.x, a.y - f.y)
                        });
                        break;
                    case "C":
                        h ? (o = i(g, p, f), a = i(d[3], d[4], f), s = i(d[5], d[6], f)) : (o = {
                            x: g,
                            y: p
                        }, a = {
                            x: d[3],
                            y: d[4]
                        }, s = {
                            x: d[5],
                            y: d[6]
                        }), this.command = "C", this.params = [f, o, a, s], this.subStart = e.subStart, this.endPoint = s, this.endTangent = function () {
                            return new v(s.x - a.x, s.y - a.y)
                        };
                        break;
                    case "S":
                        h ? (a = i(g, p, f), s = i(d[3], d[4], f)) : (a = {
                            x: g,
                            y: p
                        }, s = {
                            x: d[3],
                            y: d[4]
                        }), "C" === e.command ? (o = r(e.params[2], f), this.command = "C", this.params = [f, o, a, s], this.subStart = e.subStart, this.endPoint = s, this.endTangent = function () {
                            return new v(s.x - a.x, s.y - a.y)
                        }) : (this.command = "SQ", this.params = [f, a, s], this.subStart = e.subStart, this.endPoint = s, this.endTangent = function () {
                            return new v(s.x - a.x, s.y - a.y)
                        });
                        break;
                    case "A":
                        var m = g,
                            x = p,
                            w = d[3],
                            b = d[4],
                            _ = d[5];
                        c = h ? i(d[6], d[7], f) : {
                            x: d[6],
                            y: d[7]
                        }, this.command = "A", this.params = u(f, c, b, _, m, x, w), this.subStart = e.subStart, this.endPoint = c;
                        break;
                    case "Z":
                        this.command = "Z", this.params = [f, e.subStart], this.subStart = e.subStart, this.endPoint = e.subStart
                    }
                }, isInside: function (t, e, n) {
                    var i = this,
                        r = i.command,
                        o = i.params,
                        a = i.box;
                    if (a && !l.box(a.minX, a.maxX, a.minY, a.maxY, t, e)) return !1;
                    switch (r) {
                        default: break;
                    case "M":
                        return !1;
                    case "TL":
                    case "L":
                    case "Z":
                        return l.line(o[0].x, o[0].y, o[1].x, o[1].y, n, t, e);
                    case "SQ":
                    case "Q":
                        return l.quadraticline(o[0].x, o[0].y, o[1].x, o[1].y, o[2].x, o[2].y, n, t, e);
                    case "C":
                        return l.cubicline(o[0].x, o[0].y, o[1].x, o[1].y, o[2].x, o[2].y, o[3].x, o[3].y, n, t, e);
                    case "A":
                        var s = o,
                            u = s[1],
                            c = s[2],
                            h = s[3],
                            d = s[4],
                            f = s[5],
                            g = s[6],
                            p = s[7],
                            v = s[8],
                            y = h > d ? h : d,
                            w = h > d ? 1 : h / d,
                            b = h > d ? d / h : 1;
                        s = new m(t, e, 1);
                        var _ = new x;
                        return _.translate(-u, -c), _.rotate(-p), _.scale(1 / w, 1 / b), s.applyMatrix(_), l.arcline(0, 0, y, f, f + g, 1 - v, n, s.x, s.y)
                    }
                    return !1
                }, draw: function (t) {
                    var e, n, i, r = this.command,
                        o = this.params;
                    switch (r) {
                        default: break;
                    case "M":
                        t.moveTo(o[1].x, o[1].y);
                        break;
                    case "TL":
                    case "L":
                        t.lineTo(o[1].x, o[1].y);
                        break;
                    case "SQ":
                    case "Q":
                        e = o[1], n = o[2], t.quadraticCurveTo(e.x, e.y, n.x, n.y);
                        break;
                    case "C":
                        e = o[1], n = o[2], i = o[3], t.bezierCurveTo(e.x, e.y, n.x, n.y, i.x, i.y);
                        break;
                    case "A":
                        var a = o,
                            s = a[1],
                            u = a[2],
                            c = s,
                            h = u,
                            l = a[3],
                            d = a[4],
                            f = a[5],
                            g = a[6],
                            p = a[7],
                            v = a[8],
                            m = l > d ? l : d,
                            x = l > d ? 1 : l / d,
                            y = l > d ? d / l : 1;
                        t.translate(c, h), t.rotate(p), t.scale(x, y), t.arc(0, 0, m, f, f + g, 1 - v), t.scale(1 / x, 1 / y), t.rotate(-p), t.translate(-c, -h);
                        break;
                    case "Z":
                        t.closePath()
                    }
                }, getBBox: function (t) {
                    var e, n, i, r, o = t / 2,
                        a = this.params;
                    switch (this.command) {
                        default:
                        case "M":
                        case "Z":
                            break;
                    case "TL":
                    case "L":
                        this.box = {
                            minX: Math.min(a[0].x, a[1].x) - o,
                            maxX: Math.max(a[0].x, a[1].x) + o,
                            minY: Math.min(a[0].y, a[1].y) - o,
                            maxY: Math.max(a[0].y, a[1].y) + o
                        };
                        break;
                    case "SQ":
                    case "Q":
                        for (n = f.extrema(a[0].x, a[1].x, a[2].x), i = 0, r = n.length; i < r; i++) n[i] = f.at(a[0].x, a[1].x, a[2].x, n[i]);
                        for (n.push(a[0].x, a[2].x), e = f.extrema(a[0].y, a[1].y, a[2].y), i = 0, r = e.length; i < r; i++) e[i] = f.at(a[0].y, a[1].y, a[2].y, e);
                        e.push(a[0].y, a[2].y), this.box = {
                            minX: Math.min.apply(Math, n) - o,
                            maxX: Math.max.apply(Math, n) + o,
                            minY: Math.min.apply(Math, e) - o,
                            maxY: Math.max.apply(Math, e) + o
                        };
                        break;
                    case "C":
                        for (n = d.extrema(a[0].x, a[1].x, a[2].x, a[3].x), i = 0, r = n.length; i < r; i++) n[i] = d.at(a[0].x, a[1].x, a[2].x, a[3].x, n[i]);
                        for (e = d.extrema(a[0].y, a[1].y, a[2].y, a[3].y), i = 0, r = e.length; i < r; i++) e[i] = d.at(a[0].y, a[1].y, a[2].y, a[3].y, e[i]);
                        n.push(a[0].x, a[3].x), e.push(a[0].y, a[3].y), this.box = {
                            minX: Math.min.apply(Math, n) - o,
                            maxX: Math.max.apply(Math, n) + o,
                            minY: Math.min.apply(Math, e) - o,
                            maxY: Math.max.apply(Math, e) + o
                        };
                        break;
                    case "A":
                        var s = a,
                            u = s[1],
                            c = s[2],
                            h = s[3],
                            l = s[4],
                            p = s[5],
                            v = s[6],
                            m = s[7],
                            x = s[8],
                            y = p,
                            w = p + v,
                            b = g.xExtrema(m, h, l),
                            _ = 1 / 0,
                            M = -(1 / 0),
                            S = [y, w];
                        for (i = 2 * -Math.PI; i <= 2 * Math.PI; i += Math.PI) {
                            var A = b + i;
                            1 === x ? y < A && A < w && S.push(A) : w < A && A < y && S.push(A)
                        }
                        for (i = 0, r = S.length; i < r; i++) {
                            var P = g.xAt(m, h, l, u, S[i]);
                            P < _ && (_ = P), P > M && (M = P)
                        }
                        var T = g.yExtrema(m, h, l),
                            E = 1 / 0,
                            C = -(1 / 0),
                            I = [y, w];
                        for (i = 2 * -Math.PI; i <= 2 * Math.PI; i += Math.PI) {
                            var k = T + i;
                            1 === x ? y < k && k < w && I.push(k) : w < k && k < y && I.push(k)
                        }
                        for (i = 0, r = I.length; i < r; i++) {
                            var B = g.yAt(m, h, l, c, I[i]);
                            B < E && (E = B), B > C && (C = B)
                        }
                        this.box = {
                            minX: _ - o,
                            maxX: M + o,
                            minY: E - o,
                            maxY: C + o
                        }
                    }
                }
            }), t.exports = w
        },
        function (t, e) {
            var n = document.createElement("table"),
                i = document.createElement("tr"),
                r = /^\s*<(\w+|!)[^>]*>/,
                o = {
                    tr: document.createElement("tbody"),
                    tbody: n,
                    thead: n,
                    tfoot: n,
                    td: i,
                    th: i,
                    "*": document.createElement("div")
                };
            t.exports = {
                getBoundingClientRect: function (t) {
                    var e = t.getBoundingClientRect(),
                        n = document.documentElement.clientTop,
                        i = document.documentElement.clientLeft;
                    return {
                        top: e.top - n,
                        bottom: e.bottom - n,
                        left: e.left - i,
                        right: e.right - i
                    }
                }, getStyle: function (t, e) {
                    return window.getComputedStyle ? window.getComputedStyle(t, null)[e] : t.currentStyle[e]
                }, modiCSS: function (t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t.style[n] = e[n]);
                    return t
                }, createDom: function (t) {
                    var e = r.test(t) && RegExp.$1;
                    e in o || (e = "*");
                    var n = o[e];
                    return t = t.replace(/(^\s*)|(\s*$)/g, ""), n.innerHTML = "" + t, n.childNodes[0]
                }, addEventListener: function (t, e, n) {
                    return t.addEventListener ? (t.addEventListener(e, n, !1), {
                        remove: function () {
                            t.removeEventListener(e, n, !1)
                        }
                    }) : t.attachEvent ? (t.attachEvent("on" + e, n), {
                        remove: function () {
                            t.detachEvent("on" + e, n)
                        }
                    }) : void 0
                }
            }
        },
        function (t, e) {
            t.exports = {
                transform: function (t, e) {
                    t = t.clone();
                    for (var n = 0, i = e.length; n < i; n++) {
                        var r = e[n];
                        switch (r[0]) {
                        case "t":
                            t.translate(r[1], r[2]);
                            break;
                        case "s":
                            t.scale(r[1], r[2]);
                            break;
                        case "r":
                            t.rotate(r[1]);
                            break;
                        case "m":
                            t.multiply(r[1]);
                            break;
                        default:
                            continue
                        }
                    }
                    return t
                }, scale: function (t, e, n, i, r) {
                    return t = t.clone(), t.translate(-1 * i, -1 * r), t.scale(e, n), t.translate(i, r), t
                }, rotate: function (t, e, n, i) {
                    return t = t.clone(), t.translate(-1 * n, -1 * i), t.rotate(e), t.translate(n, i), t
                }, isMatrix3: function (t) {
                    return "matrix3" === t.type
                }
            }
        },
        function (t, e, n) {
            "use strict";

            function i(t) {
                this.space = {}, r.isString(t) ? this.setStyle(t) : t instanceof i && this.copy(t)
            }
            var r = n(1),
                o = (n(8), n(93)),
                a = n(94),
                s = n(92),
                u = {
                    hex: /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/,
                    space: /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)$/,
                    rgbNum: /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*$/,
                    rgbaNum: /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9]*\.?[0-9]+)\s*$/,
                    rgbPre: /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*$/,
                    rgbaPre: /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*([0-9]*\.?[0-9]+)\s*$/,
                    hsl: /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*$/,
                    hsla: /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*([0-9]*\.?[0-9]+)\s*$/
                };
            r.augment(i, {
                getType: function () {
                    return this.space.type
                }, toRGB: function () {
                    var t = this.space;
                    if ("rgb" !== t.type) {
                        var e = t.toRGB();
                        this.setRGB(e.r, e.g, e.b, e.a)
                    }
                }, toHSL: function () {
                    var t = this.space;
                    if ("hsl" !== t.type) {
                        var e = t.toHSL();
                        this.setHSL(e.h, e.s, e.l, e.a)
                    }
                }, getR: function () {
                    return this.toRGB(), this.space.r
                }, getG: function () {
                    return this.toRGB(), this.space.g
                }, getB: function () {
                    return this.toRGB(), this.space.b
                }, getH: function () {
                    return this.toHSL(), this.space.h
                }, getS: function () {
                    return this.toHSL(), this.space.s
                }, getL: function () {
                    return this.toHSL(), this.space.l
                }, getA: function () {
                    return this.space.a
                }, multiplyA: function (t) {
                    return void 0 === t ? this : (void 0 === this.space.a && (this.space.a = 1), this.space.a *= t, this)
                }, getRGBStyle: function () {
                    return this.toRGB(), this.space.getStyle()
                }, getRGBPreStyle: function () {
                    return this.toRGB(), this.space.getPreStyle()
                }, getHSLStyle: function () {
                    return this.toHSL(), this.space.getStyle()
                }, getHex: function () {
                    return this.toRGB(), this.space.getHex()
                }, setRGB: function (t, e, n, i) {
                    return this.space = new a, this.space.setRGB(t, e, n, i), this
                }, setHSL: function (t, e, n, i) {
                    return this.space = new o, this.space.setHSL(t, e, n, i), this
                }, setHex: function (t) {
                    return this.space = new a, t = Math.floor(t), this.space.r = (t >> 16 & 255) / 255, this.space.g = (t >> 8 & 255) / 255, this.space.b = (255 & t) / 255, this
                }, setStyle: function (t) {
                    var e;
                    if (e = u.hex.exec(t)) {
                        var n = e[1],
                            i = n.length;
                        if (3 === i) return this.setRGB(parseInt(n.charAt(0) + n.charAt(0), 16) / 255, parseInt(n.charAt(1) + n.charAt(1), 16) / 255, parseInt(n.charAt(2) + n.charAt(2), 16) / 255), this;
                        if (6 === i) return this.setRGB(parseInt(n.charAt(0) + n.charAt(1), 16) / 255, parseInt(n.charAt(2) + n.charAt(3), 16) / 255, parseInt(n.charAt(4) + n.charAt(5), 16) / 255), this
                    } else if (e = u.space.exec(t)) {
                        var r, o = e[1],
                            a = e[2];
                        switch (o) {
                        case "rgb":
                            if (r = u.rgbNum.exec(a)) return this.setRGB(parseInt(r[1], 10) / 255, parseInt(r[2], 10) / 255, parseInt(r[3], 10) / 255), this;
                            if (r = u.rgbPre.exec(a)) return this.setRGB(parseInt(r[1], 10) / 100, parseInt(r[2], 10) / 100, parseInt(r[3], 10) / 100), this;
                            break;
                        case "rgba":
                            if (r = u.rgbaNum.exec(a)) return this.setRGB(parseInt(r[1], 10) / 255, parseInt(r[2], 10) / 255, parseInt(r[3], 10) / 255, parseFloat(r[4])), this;
                            if (r = u.rgbaPre.exec(a)) return this.setRGB(parseInt(r[1], 10) / 100, parseInt(r[2], 10) / 100, parseInt(r[3], 10) / 100, parseFloat(r[4])), this;
                            break;
                        case "hsl":
                            if (r = u.hsl.exec(a)) return this.setHSL(parseInt(r[1], 10) / 360, parseInt(r[2], 10) / 100, parseInt(r[3], 10) / 100), this;
                            break;
                        case "hsla":
                            if (r = u.hsla.exec(a)) return this.setHSL(parseInt(r[1], 10) / 360, parseInt(r[2], 10) / 100, parseInt(r[3], 10) / 100, parseFloat(r[4])), this
                        }
                    } else t = t.toLowerCase(), void 0 !== s[t] ? this.setHex(s[t]) : this.setHex(s.black)
                }, copy: function (t) {
                    this.space = t.space.clone()
                }, clone: function () {
                    return new i(this)
                }
            }), t.exports = i
        },
        function (t, e) {
            t.exports = {
                aliceblue: 15792383,
                antiquewhite: 16444375,
                aqua: 65535,
                aquamarine: 8388564,
                azure: 15794175,
                beige: 16119260,
                bisque: 16770244,
                black: 0,
                blanchedalmond: 16772045,
                blue: 255,
                blueviolet: 9055202,
                brown: 10824234,
                burlywood: 14596231,
                cadetblue: 6266528,
                chartreuse: 8388352,
                chocolate: 13789470,
                coral: 16744272,
                cornflowerblue: 6591981,
                cornsilk: 16775388,
                crimson: 14423100,
                cyan: 65535,
                darkblue: 139,
                darkcyan: 35723,
                darkgoldenrod: 12092939,
                darkgray: 11119017,
                darkgreen: 25600,
                darkgrey: 11119017,
                darkkhaki: 12433259,
                darkmagenta: 9109643,
                darkolivegreen: 5597999,
                darkorange: 16747520,
                darkorchid: 10040012,
                darkred: 9109504,
                darksalmon: 15308410,
                darkseagreen: 9419919,
                darkslateblue: 4734347,
                darkslategray: 3100495,
                darkslategrey: 3100495,
                darkturquoise: 52945,
                darkviolet: 9699539,
                deeppink: 16716947,
                deepskyblue: 49151,
                dimgray: 6908265,
                dimgrey: 6908265,
                dodgerblue: 2003199,
                firebrick: 11674146,
                floralwhite: 16775920,
                forestgreen: 2263842,
                fuchsia: 16711935,
                gainsboro: 14474460,
                ghostwhite: 16316671,
                gold: 16766720,
                goldenrod: 14329120,
                gray: 8421504,
                green: 32768,
                greenyellow: 11403055,
                grey: 8421504,
                honeydew: 15794160,
                hotpink: 16738740,
                indianred: 13458524,
                indigo: 4915330,
                ivory: 16777200,
                khaki: 15787660,
                lavender: 15132410,
                lavenderblush: 16773365,
                lawngreen: 8190976,
                lemonchiffon: 16775885,
                lightblue: 11393254,
                lightcoral: 15761536,
                lightcyan: 14745599,
                lightgoldenrodyellow: 16448210,
                lightgray: 13882323,
                lightgreen: 9498256,
                lightgrey: 13882323,
                lightpink: 16758465,
                lightsalmon: 16752762,
                lightseagreen: 2142890,
                lightskyblue: 8900346,
                lightslategray: 7833753,
                lightslategrey: 7833753,
                lightsteelblue: 11584734,
                lightyellow: 16777184,
                lime: 65280,
                limegreen: 3329330,
                linen: 16445670,
                magenta: 16711935,
                maroon: 8388608,
                mediumaquamarine: 6737322,
                mediumblue: 205,
                mediumorchid: 12211667,
                mediumpurple: 9662683,
                mediumseagreen: 3978097,
                mediumslateblue: 8087790,
                mediumspringgreen: 64154,
                mediumturquoise: 4772300,
                mediumvioletred: 13047173,
                midnightblue: 1644912,
                mintcream: 16121850,
                mistyrose: 16770273,
                moccasin: 16770229,
                navajowhite: 16768685,
                navy: 128,
                oldlace: 16643558,
                olive: 8421376,
                olivedrab: 7048739,
                orange: 16753920,
                orangered: 16729344,
                orchid: 14315734,
                palegoldenrod: 15657130,
                palegreen: 10025880,
                paleturquoise: 11529966,
                palevioletred: 14381203,
                papayawhip: 16773077,
                peachpuff: 16767673,
                peru: 13468991,
                pink: 16761035,
                plum: 14524637,
                powderblue: 11591910,
                purple: 8388736,
                red: 16711680,
                rosybrown: 12357519,
                royalblue: 4286945,
                saddlebrown: 9127187,
                salmon: 16416882,
                sandybrown: 16032864,
                seagreen: 3050327,
                seashell: 16774638,
                sienna: 10506797,
                silver: 12632256,
                skyblue: 8900331,
                slateblue: 6970061,
                slategray: 7372944,
                slategrey: 7372944,
                snow: 16775930,
                springgreen: 65407,
                steelblue: 4620980,
                tan: 13808780,
                teal: 32896,
                thistle: 14204888,
                tomato: 16737095,
                turquoise: 4251856,
                violet: 15631086,
                wheat: 16113331,
                white: 16777215,
                whitesmoke: 16119285,
                yellow: 16776960,
                yellowgreen: 10145074
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(8),
                o = function () {
                    this.h = 0, this.s = 0, this.l = 0
                };
            i.augment(o, {
                type: "hsl",
                setHSL: function (t, e, n, i) {
                    this.h = r.mod(t, 1), this.s = r.clamp(e, 0, 1), this.l = r.clamp(n, 0, 1), void 0 !== i ? this.a = r.clamp(i, 0, 1) : this.a = void 0
                }, toRGB: function () {
                    function t(t, e, n) {
                        return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < .5 ? e : n < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - n) : t
                    }
                    return function () {
                        var e = this,
                            n = e.h,
                            i = e.s,
                            r = e.l;
                        if (0 === i) return {
                            r: r,
                            g: r,
                            b: r,
                            a: e.a
                        };
                        var o = r <= .5 ? r * (1 + i) : r + i - r * i,
                            a = 2 * r - o;
                        return {
                            r: t(a, o, n + 1 / 3),
                            g: t(a, o, n),
                            b: t(a, o, n - 1 / 3),
                            a: e.a
                        }
                    }
                }(),
                clone: function () {
                    var t = new o;
                    return t.h = this.h, t.s = this.s, t.l = this.l, t.a = this.a, t
                }, copy: function (t) {
                    return this.h = t.h, this.s = t.s, this.l = t.l, this.a = t.a, this
                }, getStyle: function () {
                    var t = this;
                    return void 0 === t.a ? "hsl(" + Math.round(360 * t.h) + ", " + Math.round(100 * t.s) + "%, " + Math.round(100 * t.l) + "%)" : "hsla(" + Math.round(360 * t.h) + ", " + Math.round(100 * t.s) + "%, " + Math.round(100 * t.l) + "%, " + t.a + ")"
                }
            }), t.exports = o
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(8),
                o = function () {
                    this.r = 0, this.g = 0, this.b = 0, this.type = "rgb"
                };
            i.augment(o, {
                type: "rgb",
                setRGB: function (t, e, n, i) {
                    this.r = r.clamp(t, 0, 1), this.g = r.clamp(e, 0, 1), this.b = r.clamp(n, 0, 1), void 0 !== i ? this.a = r.clamp(i, 0, 1) : this.a = void 0
                }, toHSL: function () {
                    var t, e, n = this.r,
                        i = this.g,
                        r = this.b,
                        o = Math.max(n, i, r),
                        a = Math.min(n, i, r),
                        s = (a + o) / 2;
                    if (a === o) t = 0, e = 0;
                    else {
                        var u = o - a;
                        switch (e = s <= .5 ? u / (o + a) : u / (2 - o - a), o) {
                        case n:
                            t = (i - r) / u + (i < r ? 6 : 0);
                            break;
                        case i:
                            t = (r - n) / u + 2;
                            break;
                        case r:
                            t = (n - i) / u + 4
                        }
                        t /= 6
                    }
                    return {
                        h: t,
                        s: e,
                        l: s,
                        a: this.a
                    }
                }, getHex: function () {
                    var t = 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0;
                    return "#" + ("000000" + t.toString(16)).slice(-6)
                }, getStyle: function () {
                    return void 0 === this.a ? "rgb(" + Math.round(255 * this.r).toString() + ", " + Math.round(255 * this.g).toString() + ", " + Math.round(255 * this.b).toString() + ")" : "rgba(" + Math.round(255 * this.r).toString() + ", " + Math.round(255 * this.g).toString() + ", " + Math.round(255 * this.b).toString() + ", " + this.a + ")"
                }, getPreStyle: function () {
                    return void 0 === this.a ? "rgb(" + Math.round(100 * this.r).toString() + "%, " + Math.round(100 * this.g).toString() + "%, " + Math.round(100 * this.b).toString() + "%)" : "rgba(" + Math.round(100 * this.r).toString() + "%, " + Math.round(100 * this.g).toString() + "%, " + Math.round(100 * this.b).toString() + "%, " + this.a + ")"
                }, clone: function () {
                    var t = new o;
                    return t.r = this.r, t.g = this.g, t.b = this.b, t.a = this.a, t
                }, copy: function (t) {
                    return this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this
                }
            }), t.exports = o
        },
        function (t, e, n) {
            var i = n(96);
            t.exports = i
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = function (t, e, n, i) {
                    this.type = t, this.target = null, this.currentTarget = null, this.bubbles = n, this.cancelable = i, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.removed = !1, this.event = e
                };
            i.augment(r, {
                preventDefault: function () {
                    this.defaultPrevented = this.cancelable && !0
                }, stopPropagation: function () {
                    this.propagationStopped = !0
                }, remove: function () {
                    this.remove = !0
                }, clone: function () {
                    return i.clone(this)
                }, toString: function () {
                    return "[Event (type=" + this.type + ")]"
                }
            }), t.exports = r
        },
        function (t, e, n) {
            var i = n(100);
            t.exports = {
                interpolation: i.interpolation,
                unInterpolation: i.unInterpolation
            }
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                for (var n = [], r = Math.min(t.length, e.length), s = 0; s < r; s++) a.isArray(t[s]) && a.isArray(e[s]) ? n[s] = i(t[s], e[s]) : n[s] = o.singular(t[s], e[s]);
                return function (t) {
                    for (var e = [], i = 0; i < r; i++) e[i] = n[i](t);
                    return e
                }
            }

            function r(t, e) {
                for (var n = [], i = Math.min(t.length, e.length), s = 0; s < i; s++) a.isArray(t[s]) && a.isArray(e[s]) ? n[s] = r(t[s], e[s]) : n[s] = o.unSingular(t[s], e[s]);
                return function (t) {
                    for (var e = Math.min(n.length, t.length), i = 0, r = 0, o = 0; o < e; o++) i += n[o](t[o]), r++;
                    return 0 === r ? 0 : i / r
                }
            }
            var o = n(17),
                a = n(1);
            t.exports = {
                array: i,
                unArray: r
            }
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                switch (e.getType()) {
                case "rgb":
                    return o(t, e);
                case "hsl":
                    return s(t, e)
                }
            }

            function r(t, e) {
                switch (e.getType()) {
                case "rgb":
                    return a(t, e);
                case "hsl":
                    return u(t, e)
                }
            }

            function o(t, e) {
                var n = t.getR(),
                    i = t.getG(),
                    r = t.getB(),
                    o = t.getA(),
                    a = e.getR() - n,
                    s = e.getG() - i,
                    u = e.getB() - r,
                    h = e.getA();
                return void 0 === o && void 0 === h || (o = o || 1, h = (void 0 === h ? 1 : h) - o),
                    function (t) {
                        var e = new c;
                        return e.setRGB(n + a * t, i + s * t, r + u * t, void 0 !== o && void 0 !== h ? o + h * t : void 0), e.getRGBStyle()
                    }
            }

            function a(t, e) {
                var n = t.getR(),
                    i = t.getG(),
                    r = t.getB(),
                    o = t.getA(),
                    a = e.getR() - n,
                    s = e.getG() - i,
                    u = e.getB() - r,
                    h = e.getA();
                return void 0 === o && void 0 === h || (o = o || 1, h = (void 0 === h ? 1 : h) - o),
                    function (t) {
                        if (t = new c(t), !t.getType()) return 0;
                        var e = t.getR(),
                            l = t.getG(),
                            d = t.getB(),
                            f = t.getA();
                        f = f || 1;
                        var g = 0,
                            p = 0;
                        return 0 !== a && (g += (e - n) / a, p++), 0 !== s && (g += (l - i) / s, p++), 0 !== u && (g += (d - r) / u, p++), 0 !== h && h && (g += (f - o) / h, p++), 0 === p ? 0 : g / p
                    }
            }

            function s(t, e) {
                var n = t.getH(),
                    i = t.getS(),
                    r = t.getL(),
                    o = t.getA(),
                    a = e.getH() - n,
                    s = e.getS() - i,
                    u = e.getL() - r,
                    h = e.getA();
                return void 0 === o && void 0 === h || (o = o || 1, h = (void 0 === h ? 1 : h) - o),
                    function (t) {
                        var e = new c;
                        return e.setHSL(n + a * t, i + s * t, r + u * t, void 0 !== o && void 0 !== h ? o + h * t : void 0), e.getHSLStyle();
                    }
            }

            function u(t, e) {
                var n = t.getH(),
                    i = t.getS(),
                    r = t.getL(),
                    o = t.getA(),
                    a = e.getH() - n,
                    s = e.getS() - i,
                    u = e.getL() - r,
                    h = e.getA();
                return void 0 === o && void 0 === h || (o = o || 1, h = (void 0 === h ? 1 : h) - o),
                    function (t) {
                        if (t = new c(t), !t.getType()) return 0;
                        var e = t.getH(),
                            l = t.getS(),
                            d = t.getL(),
                            f = t.getA();
                        f = f || 1;
                        var g = 0,
                            p = 0;
                        return 0 !== a && (g += (e - n) / a, p++), 0 !== s && (g += (l - i) / s, p++), 0 !== u && (g += (d - r) / u, p++), 0 !== h && h && (g += (f - o) / h, p++), 0 === p ? 0 : g / p
                    }
            }
            var c = n(16);
            t.exports = {
                color: i,
                unColor: r
            }
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                return o.isObject(t) && o.isObject(e) ? "matrix3" === t.type && "matrix3" === e.type ? h.matrix(t, e) : "path" === t.type && "path" === e.type ? a.path(t, e) : u.object(t, e) : o.isArray(t) && o.isArray(e) ? s.array(t, e) : c.singular(t, e)
            }

            function r(t, e) {
                return "matrix3" === t.type && "matrix3" === e.type ? h.unMatrix(t, e) : o.isArray(t) && o.isArray(e) ? s.unArray(t, e) : o.isObject(t) && o.isObject(e) ? u.unObject(t, e) : c.unSingular(t, e)
            }
            var o = n(1),
                a = n(104),
                s = n(98),
                u = n(103),
                c = n(17),
                h = n(101),
                l = n(4);
            l.Matrix3;
            t.exports = {
                interpolation: i,
                unInterpolation: r
            }
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                for (var n = [], i = t.elements, r = e.elements, a = 0; a < u; a++) n[a] = o.singular(i[a], r[a]);
                return function (t) {
                    for (var e = new s, i = e.elements, r = 0; r < u; r++) i[r] = n[r](t);
                    return e
                }
            }

            function r(t, e) {
                for (var n = [], i = t.elements, r = e.elements, a = 0; a < u; a++) n[a] = o.unSingular(i[a], r[a]);
                return function (t) {
                    for (var e = t.elements, i = 0, r = 0, o = 0; o < u; o++) {
                        var a = n[o](e[o]);
                        0 !== a && (i += a, r++)
                    }
                    return i / r
                }
            }
            var o = n(17),
                a = n(4),
                s = a.Matrix3,
                u = 9;
            t.exports = {
                matrix: i,
                unMatrix: r
            }
        },
        function (t, e) {
            "use strict";

            function n(t, e) {
                return t = +t, e = +e,
                    function (n) {
                        return t * (1 - n) + e * n
                    }
            }

            function i(t, e) {
                return e -= t,
                    function (n) {
                        return 0 === e ? 0 : (n - t) / e
                    }
            }
            t.exports = {
                number: n,
                unNumber: i
            }
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                var n = {};
                for (var i in t) i in e && (n[i] = o.singular(t[i], e[i]));
                return function (t) {
                    var e = {};
                    for (var i in n) e[i] = n[i](t);
                    return e
                }
            }

            function r(t, e) {
                var n = {};
                for (var i in t) i in e && (n[i] = o.unSingular(t[i], e[i]));
                return function (t) {
                    var e = 0,
                        i = 0;
                    for (var r in n) r in t && (e += n[r](t[r]), i++);
                    return 0 === i ? 0 : e / i
                }
            }
            var o = n(17);
            t.exports = {
                object: i,
                unObject: r
            }
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                var n = r.toCurve(t.path, e.path),
                    i = n[0],
                    o = n[1];
                return function (n) {
                    var r = [];
                    if (n >= 1) return e.path;
                    if (n <= 0) return t.path;
                    for (var a = 0; a < i.length; a++) {
                        r[a] = [i[a][0]];
                        for (var s = 1; s < i[a].length; s++) r[a][s] = (o[a][s] - i[a][s]) * n + i[a][s]
                    }
                    return r
                }
            }
            var r = n(23);
            t.exports = {
                path: i
            }
        },
        function (t, e) {
            "use strict";

            function n(t, e) {
                var n = t.length;
                if (0 === n) return NaN;
                var i = t[0];
                if (e < t[0]) return NaN;
                if (e >= t[n - 1]) return t[n - 1];
                for (var r = 1; r < t.length && !(e < t[r]); r++) i = t[r];
                return i
            }

            function i(t, e) {
                var n = t.length;
                if (0 === n) return NaN;
                var i, r = t[0];
                if (e > t[n - 1]) return NaN;
                if (e < t[0]) return t[0];
                for (var o = 1; o < t.length; o++) {
                    if (e <= t[o]) {
                        i = t[o];
                        break
                    }
                    r = t[o]
                }
                return i
            }
            var r = {
                PRECISION: 1e-5,
                equal: function (t, e) {
                    return Math.abs(t - e) < r.PRECISION
                }, clamp: function (t, e, n) {
                    return t < e ? e : t > n ? n : t
                }, snapTo: function (t, e) {
                    var r = n(t, e),
                        o = i(t, e);
                    if (isNaN(r) || isNaN(o)) {
                        if (t[0] >= e) return t[0];
                        var a = t[t.length - 1];
                        if (a <= e) return a
                    }
                    return Math.abs(e - r) < Math.abs(o - e) ? r : o
                }, snapFloor: function (t, e) {
                    return n(t, e)
                }, snapCeiling: function (t, e) {
                    return i(t, e)
                }, degreeToRad: function (t) {
                    return Math.PI / 180 * t
                }, radToDegree: function (t) {
                    return 180 / Math.PI * t
                }, mod: function (t, e) {
                    return (t % e + e) % e
                }
            };
            t.exports = r
        },
        function (t, e, n) {
            "use strict";

            function i() {
                this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]
            }
            var r = n(1),
                o = n(8);
            i.multiply = function (t, e) {
                var n = t.elements,
                    r = e.elements,
                    o = new i;
                return o.set(n[0] * r[0] + n[3] * r[1] + n[6] * r[2], n[0] * r[3] + n[3] * r[4] + n[6] * r[5], n[0] * r[6] + n[3] * r[7] + n[6] * r[8], n[1] * r[0] + n[4] * r[1] + n[7] * r[2], n[1] * r[3] + n[4] * r[4] + n[7] * r[5], n[1] * r[6] + n[4] * r[7] + n[7] * r[8], n[2] * r[0] + n[5] * r[1] + n[8] * r[2], n[2] * r[3] + n[5] * r[4] + n[8] * r[5], n[2] * r[6] + n[5] * r[7] + n[8] * r[8])
            }, i.equal = function (t, e) {
                for (var n = t.elements, i = e.elements, r = !0, a = 0, s = n.length; a < s; a++)
                    if (!o.equal(n[a], i[a])) {
                        r = !1;
                        break
                    }
                return r
            }, r.augment(i, {
                type: "matrix3",
                set: function (t, e, n, i, r, o, a, s, u) {
                    var c = this.elements;
                    return c[0] = t, c[3] = e, c[6] = n, c[1] = i, c[4] = r, c[7] = o, c[2] = a, c[5] = s, c[8] = u, this
                }, get: function (t, e) {
                    return t--, e--, this.elements[3 * e + t]
                }, identity: function () {
                    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1)
                }, multiplyScalar: function (t) {
                    var e = this.elements;
                    return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this
                }, det: function () {
                    var t = this.elements,
                        e = t[0],
                        n = t[1],
                        i = t[2],
                        r = t[3],
                        o = t[4],
                        a = t[5],
                        s = t[6],
                        u = t[7],
                        c = t[8];
                    return e * o * c - e * a * u - n * r * c + n * a * s + i * r * u - i * o * s
                }, inverse: function (t) {
                    return this.copy(this.getInverse(t))
                }, getInverse: function (t) {
                    var e = this.det();
                    if (0 === e) {
                        if (t) throw "matrix exception: get inverse matrix with 0 det";
                        return console.warn("matrix cannot inverse"), new i
                    }
                    var n = this.elements,
                        r = (n[0], n[3], n[6], n[1], n[4], n[7], n[2], n[5], n[8], new i);
                    return r.set(n[4] * n[8] - n[7] * n[5], -(n[3] * n[8] - n[6] * n[5]), n[3] * n[7] - n[6] * n[4], -(n[1] * n[8] - n[7] * n[2]), n[0] * n[8] - n[6] * n[2], -(n[0] * n[7] - n[6] * n[1]), n[1] * n[5] - n[4] * n[2], -(n[0] * n[5] - n[3] * n[2]), n[0] * n[4] - n[3] * n[1]), r.multiplyScalar(1 / e), r
                }, transpose: function () {
                    var t, e = this.elements;
                    return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this
                }, multiply: function (t) {
                    return this.copy(i.multiply(this, t))
                }, translate: function (t, e) {
                    var n = new i;
                    return n.set(1, 0, t, 0, 1, e, 0, 0, 1), this.copy(i.multiply(n, this))
                }, rotate: function (t) {
                    var e = new i;
                    return e.set(Math.cos(t), -Math.sin(t), 0, Math.sin(t), Math.cos(t), 0, 0, 0, 1), this.copy(i.multiply(e, this))
                }, scale: function (t, e) {
                    var n = new i;
                    return n.set(t, 0, 0, 0, e, 0, 0, 0, 1), this.copy(i.multiply(n, this))
                }, equal: function (t) {
                    return i.equal(this, t)
                }, copy: function (t) {
                    for (var e = t.elements, n = this.elements, i = 0, r = e.length; i < r; i++) n[i] = e[i];
                    return this
                }, clone: function () {
                    for (var t = new i, e = t.elements, n = this.elements, r = 0, o = n.length; r < o; r++) e[r] = n[r];
                    return t
                }, to2DObject: function () {
                    var t = this.elements;
                    return {
                        a: t[0],
                        b: t[1],
                        c: t[3],
                        d: t[4],
                        e: t[6],
                        f: t[7]
                    }
                }, from2DObject: function (t) {
                    var e = this.elements;
                    return e[0] = t.a, e[1] = t.b, e[3] = t.c, e[4] = t.d, e[6] = t.e, e[7] = t.f, this
                }
            }), t.exports = i
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                if (1 === arguments.length) {
                    var n = t;
                    t = n[0], e = n[1]
                }
                this.x = t || 0, this.y = e || 0
            }
            var r = n(1),
                o = n(8);
            i.add = function (t, e) {
                return new i(t.x + e.x, t.y + e.y)
            }, i.sub = function (t, e) {
                return new i(t.x - e.x, t.y - e.y)
            }, i.lerp = function (t, e, n) {
                return new i(t.x + (e.x - t.x) * n, t.y + (e.y - t.y) * n)
            }, i.angle = function (t, e) {
                var n = t.dot(e) / (t.length() * e.length());
                return Math.acos(o.clamp(n, -1, 1))
            }, i.direction = function (t, e) {
                return t.x * e.y - e.x * t.y
            }, r.augment(i, {
                type: "vector2",
                set: function (t, e) {
                    return this.x = t, this.y = e, this
                }, setComponent: function (t, e) {
                    switch (t) {
                    case 0:
                        return this.x = e, this;
                    case 1:
                        return this.y = e, this;
                    default:
                        throw new Error("the index out of range:" + t)
                    }
                }, getComponent: function (t) {
                    switch (t) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    default:
                        throw new Error("the index out of range:" + t)
                    }
                }, copy: function (t) {
                    return this.x = t.x, this.y = t.y, this
                }, add: function (t) {
                    return this.copy(i.add(this, t))
                }, sub: function (t) {
                    return this.copy(i.sub(this, t))
                }, subBy: function (t) {
                    return this.copy(i.sub(t, this))
                }, multiplyScaler: function (t) {
                    return this.x *= t, this.y *= t, this
                }, divideScaler: function (t) {
                    if (0 !== t) {
                        var e = 1 / t;
                        this.x *= e, this.y *= e
                    } else this.x = 0, this.y = 0;
                    return this
                }, min: function (t) {
                    return this.x > t.x && (this.x = t.x), this.y > t.y && (this.y = t.y), this
                }, max: function (t) {
                    return this.x < t.x && (this.x = t.x), this.y < t.y && (this.y = t.y), this
                }, clamp: function (t, e) {
                    return this.x < t.x ? this.x = t.x : this.x > e.x && (this.x = e.x), this.y < t.y ? this.y = t.y : this.y > e.y && (this.y = e.y), this
                }, clampScale: function () {
                    var t, e;
                    return function (n, r) {
                        return void 0 === t && (t = new i, e = new i), t.set(n, n), e.set(r, r), this.clamp(t, e)
                    }
                }(),
                floor: function () {
                    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
                }, ceil: function () {
                    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
                }, round: function () {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this
                }, roundToZero: function () {
                    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
                }, negate: function () {
                    return this.x = -this.x, this.y = -this.y, this
                }, dot: function (t) {
                    return this.x * t.x + this.y * t.y
                }, lengthSq: function () {
                    return this.x * this.x + this.y * this.y
                }, length: function () {
                    return Math.sqrt(this.lengthSq())
                }, normalize: function () {
                    return this.divideScaler(this.length())
                }, distanceToSquared: function (t) {
                    var e = this.x - t.x,
                        n = this.y - t.y;
                    return e * e + n * n
                }, distanceTo: function (t) {
                    return Math.sqrt(this.distanceToSquared(t))
                }, angleTo: function (t, e) {
                    var n = this.angle(t),
                        r = i.direction(this, t) >= 0;
                    return e ? r ? 2 * Math.PI - n : n : r ? n : 2 * Math.PI - n
                }, vertical: function (t) {
                    return t ? new i(this.y, -this.x) : new i(-this.y, this.x)
                }, angle: function (t) {
                    return i.angle(this, t)
                }, setLength: function (t) {
                    var e = this.length();
                    return 0 !== e && t !== e && this.multiplyScaler(t / e), this
                }, isZero: function () {
                    return 0 === this.x && 0 === this.y
                }, lerp: function (t, e) {
                    return this.copy(i.lerp(this, t, e))
                }, equal: function (t) {
                    return o.equal(this.x, t.x) && o.equal(this.y, t.y)
                }, clone: function () {
                    return new i(this.x, this.y)
                }, rotate: function (t) {
                    var e = this.x * Math.cos(t) - this.y * Math.sin(t),
                        n = this.x * Math.sin(t) + this.y * Math.cos(t);
                    return this.x = e, this.y = n, this
                }
            }), t.exports = i
        },
        function (t, e, n) {
            "use strict";

            function i(t, e, n) {
                if (1 === arguments.length)
                    if (r.isArray(t)) {
                        var i = t;
                        t = i[0], e = i[1], n = i[2]
                    } else if ("vector2" === t.type) {
                    var o = t;
                    t = o.x, e = o.y, n = 1
                }
                this.x = t || 0, this.y = e || 0, this.z = n || 0
            }
            var r = n(1),
                o = n(8);
            i.add = function (t, e) {
                return new i(t.x + e.x, t.y + e.y, t.z + e.z)
            }, i.sub = function (t, e) {
                return new i(t.x - e.x, t.y - e.y, t.z - e.z)
            }, i.lerp = function (t, e, n) {
                return new i(t.x + (e.x - t.x) * n, t.y + (e.y - t.y) * n, t.z + (e.z - t.z) * n)
            }, i.cross = function (t, e) {
                var n = t.x,
                    r = t.y,
                    o = t.z,
                    a = e.x,
                    s = e.y,
                    u = e.z;
                return new i(r * u - o * s, o * a - n * u, n * s - r * a)
            }, i.angle = function (t, e) {
                var n = t.dot(e) / (t.length() * e.length());
                return Math.acos(o.clamp(n, -1, 1))
            }, r.augment(i, {
                type: "vector3",
                set: function (t, e, n) {
                    return this.x = t, this.y = e, this.z = n, this
                }, setComponent: function (t, e) {
                    switch (t) {
                    case 0:
                        return this.x = e, this;
                    case 1:
                        return this.y = e, this;
                    case 2:
                        return this.z = e, this;
                    default:
                        throw new Error("index is out of range:" + t)
                    }
                }, getComponent: function (t) {
                    switch (t) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    case 2:
                        return this.z;
                    default:
                        throw new Error("index is out of range:" + t)
                    }
                }, add: function (t) {
                    return this.copy(i.add(this, t))
                }, sub: function (t) {
                    return this.copy(i.sub(this, t))
                }, subBy: function (t) {
                    return this.copy(i.sub(t, this))
                }, multiplyScaler: function (t) {
                    return this.x *= t, this.y *= t, this.z *= t, this
                }, divideScaler: function (t) {
                    if (0 !== t) {
                        var e = 1 / t;
                        this.x *= e, this.y *= e, this.z *= e
                    } else this.x = 0, this.y = 0, this.z = 0;
                    return this
                }, min: function (t) {
                    return this.x > t.x && (this.x = t.x), this.y > t.y && (this.y = t.y), this.z > t.z && (this.z = t.z), this
                }, max: function (t) {
                    return this.x < t.x && (this.x = t.x), this.y < t.y && (this.y = t.y), this.z < t.z && (this.z = t.z), this
                }, clamp: function (t, e) {
                    return this.x < t.x ? this.x = t.x : this.x > e.x && (this.x = e.x), this.y < t.y ? this.y = t.y : this.y > e.y && (this.y = e.y), this.z < t.z ? this.z = t.z : this.z > e.z && (this.z = e.z), this
                }, clampScale: function () {
                    var t, e;
                    return function (n, r) {
                        return void 0 === t && (t = new i, e = new i), t.set(n, n, n), e.set(r, r, r), this.clamp(t, e)
                    }
                }(),
                floor: function () {
                    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
                }, ceil: function () {
                    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
                }, round: function () {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
                }, roundToZero: function () {
                    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this
                }, negate: function () {
                    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
                }, dot: function (t) {
                    return this.x * t.x + this.y * t.y + this.z * t.z
                }, lengthSq: function () {
                    return this.x * this.x + this.y * this.y + this.z * this.z
                }, length: function () {
                    return Math.sqrt(this.lengthSq())
                }, lengthManhattan: function () {
                    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
                }, normalize: function () {
                    return this.divideScaler(this.length())
                }, setLength: function (t) {
                    var e = this.length();
                    return 0 !== e && t !== e && this.multiplyScaler(t / e), this
                }, lerp: function (t, e) {
                    return this.copy(i.lerp(this, t, e))
                }, cross: function (t) {
                    return this.copy(i.cross(this, t))
                }, angle: function (t) {
                    return i.angle(this, t)
                }, distanceToSquared: function (t) {
                    var e = this.x - t.x,
                        n = this.y - t.y,
                        i = this.z - t.z;
                    return e * e + n * n + i * i
                }, distanceTo: function (t) {
                    return Math.sqrt(this.distanceToSquared(t))
                }, applyMatrix: function (t) {
                    var e = t.elements,
                        n = e[0] * this.x + e[3] * this.y + e[6] * this.z,
                        i = e[1] * this.x + e[4] * this.y + e[7] * this.z,
                        r = e[2] * this.x + e[5] * this.y + e[8] * this.z;
                    return this.x = n, this.y = i, this.z = r, this
                }, copy: function (t) {
                    return this.x = t.x, this.y = t.y, this.z = void 0 !== t.z ? t.z : 1, this
                }, equal: function (t) {
                    return o.equal(this.x, t.x) && o.equal(this.y, t.y) && o.equal(this.z, t.z)
                }, clone: function () {
                    return new i(this.x, this.y, this.z)
                }
            }), t.exports = i
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = Math.PI,
                o = "\t\n\v\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029",
                a = new RegExp("([a-z])[" + o + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + o + "]*,?[" + o + "]*)+)", "ig"),
                s = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + o + "]*,?[" + o + "]*", "ig"),
                u = function (t) {
                    if (!t) return null;
                    if (typeof t == typeof []) return t;
                    var e = {
                            a: 7,
                            c: 6,
                            o: 2,
                            h: 1,
                            l: 2,
                            m: 2,
                            r: 4,
                            q: 4,
                            s: 4,
                            t: 2,
                            v: 1,
                            u: 3,
                            z: 0
                        },
                        n = [];
                    return String(t).replace(a, function (t, i, r) {
                        var o = [],
                            a = i.toLowerCase();
                        if (r.replace(s, function (t, e) {
                            e && o.push(+e)
                        }), "m" == a && o.length > 2 && (n.push([i].concat(o.splice(0, 2))), a = "l", i = "m" == i ? "l" : "L"), "o" == a && 1 == o.length && n.push([i, o[0]]), "r" == a) n.push([i].concat(o));
                        else
                            for (; o.length >= e[a] && (n.push([i].concat(o.splice(0, e[a]))), e[a]););
                    }), n
                },
                c = function (t, e) {
                    for (var n = [], i = 0, r = t.length; r - 2 * !e > i; i += 2) {
                        var o = [{
                            x: +t[i - 2],
                            y: +t[i - 1]
                        }, {
                            x: +t[i],
                            y: +t[i + 1]
                        }, {
                            x: +t[i + 2],
                            y: +t[i + 3]
                        }, {
                            x: +t[i + 4],
                            y: +t[i + 5]
                        }];
                        e ? i ? r - 4 == i ? o[3] = {
                            x: +t[0],
                            y: +t[1]
                        } : r - 2 == i && (o[2] = {
                            x: +t[0],
                            y: +t[1]
                        }, o[3] = {
                            x: +t[2],
                            y: +t[3]
                        }) : o[0] = {
                            x: +t[r - 2],
                            y: +t[r - 1]
                        } : r - 4 == i ? o[3] = o[2] : i || (o[0] = {
                            x: +t[i],
                            y: +t[i + 1]
                        }), n.push(["C", (-o[0].x + 6 * o[1].x + o[2].x) / 6, (-o[0].y + 6 * o[1].y + o[2].y) / 6, (o[1].x + 6 * o[2].x - o[3].x) / 6, (o[1].y + 6 * o[2].y - o[3].y) / 6, o[2].x, o[2].y])
                    }
                    return n
                },
                h = function (t, e, n, i, r) {
                    if (null == r && null == i && (i = n), t = +t, e = +e, n = +n, i = +i, null != r) var o = Math.PI / 180,
                        a = t + n * Math.cos(-i * o),
                        s = t + n * Math.cos(-r * o),
                        u = e + n * Math.sin(-i * o),
                        c = e + n * Math.sin(-r * o),
                        h = [
                            ["M", a, u],
                            ["A", n, n, 0, +(r - i > 180), 0, s, c]
                        ];
                    else h = [
                        ["M", t, e],
                        ["m", 0, -i],
                        ["a", n, i, 0, 1, 1, 0, 2 * i],
                        ["a", n, i, 0, 1, 1, 0, -2 * i],
                        ["z"]
                    ];
                    return h
                },
                l = function (t) {
                    if (t = u(t), !t || !t.length) return [
                        ["M", 0, 0]
                    ];
                    var e, n = [],
                        i = 0,
                        r = 0,
                        o = 0,
                        a = 0,
                        s = 0;
                    "M" == t[0][0] && (i = +t[0][1], r = +t[0][2], o = i, a = r, s++, n[0] = ["M", i, r]);
                    for (var l, d, f = 3 == t.length && "M" == t[0][0] && "R" == t[1][0].toUpperCase() && "Z" == t[2][0].toUpperCase(), g = s, p = t.length; g < p; g++) {
                        if (n.push(l = []), d = t[g], e = d[0], e != e.toUpperCase()) switch (l[0] = e.toUpperCase(), l[0]) {
                            case "A":
                                l[1] = d[1], l[2] = d[2], l[3] = d[3], l[4] = d[4], l[5] = d[5], l[6] = +d[6] + i, l[7] = +d[7] + r;
                                break;
                            case "V":
                                l[1] = +d[1] + r;
                                break;
                            case "H":
                                l[1] = +d[1] + i;
                                break;
                            case "R":
                                for (var v = [i, r].concat(d.slice(1)), m = 2, x = v.length; m < x; m++) v[m] = +v[m] + i, v[++m] = +v[m] + r;
                                n.pop(), n = n.concat(c(v, f));
                                break;
                            case "O":
                                n.pop(), v = h(i, r, d[1], d[2]), v.push(v[0]), n = n.concat(v);
                                break;
                            case "U":
                                n.pop(), n = n.concat(h(i, r, d[1], d[2], d[3])), l = ["U"].concat(n[n.length - 1].slice(-2));
                                break;
                            case "M":
                                o = +d[1] + i, a = +d[2] + r;
                            default:
                                for (m = 1, x = d.length; m < x; m++) l[m] = +d[m] + (m % 2 ? i : r)
                            } else if ("R" == e) v = [i, r].concat(d.slice(1)), n.pop(), n = n.concat(c(v, f)), l = ["R"].concat(d.slice(-2));
                            else if ("O" == e) n.pop(), v = h(i, r, d[1], d[2]), v.push(v[0]), n = n.concat(v);
                        else if ("U" == e) n.pop(), n = n.concat(h(i, r, d[1], d[2], d[3])), l = ["U"].concat(n[n.length - 1].slice(-2));
                        else
                            for (var y = 0, w = d.length; y < w; y++) l[y] = d[y]; if (e = e.toUpperCase(), "O" != e) switch (l[0]) {
                        case "Z":
                            i = +o, r = +a;
                            break;
                        case "H":
                            i = l[1];
                            break;
                        case "V":
                            r = l[1];
                            break;
                        case "M":
                            o = l[l.length - 2], a = l[l.length - 1];
                        default:
                            i = l[l.length - 2], r = l[l.length - 1]
                        }
                    }
                    return n
                },
                d = function (t, e, n, i) {
                    return [t, e, n, i, n, i]
                },
                f = function (t, e, n, i, r, o) {
                    var a = 1 / 3,
                        s = 2 / 3;
                    return [a * t + s * n, a * e + s * i, a * r + s * n, a * o + s * i, r, o]
                },
                g = function (t, e, n, i, r, o, a, s, u, c) {
                    n === i && (n += 1);
                    var h, l = 120 * Math.PI / 180,
                        d = Math.PI / 180 * (+r || 0),
                        f = [],
                        p = function (t, e, n) {
                            var i = t * Math.cos(n) - e * Math.sin(n),
                                r = t * Math.sin(n) + e * Math.cos(n);
                            return {
                                x: i,
                                y: r
                            }
                        };
                    if (c) S = c[0], A = c[1], _ = c[2], M = c[3];
                    else {
                        h = p(t, e, -d), t = h.x, e = h.y, h = p(s, u, -d), s = h.x, u = h.y, t === s && e === u && (s += 1, u += 1);
                        var v = (Math.cos(Math.PI / 180 * r), Math.sin(Math.PI / 180 * r), (t - s) / 2),
                            m = (e - u) / 2,
                            x = v * v / (n * n) + m * m / (i * i);
                        x > 1 && (x = Math.sqrt(x), n *= x, i *= x);
                        var y = n * n,
                            w = i * i,
                            b = (o == a ? -1 : 1) * Math.sqrt(Math.abs((y * w - y * m * m - w * v * v) / (y * m * m + w * v * v))),
                            _ = b * n * m / i + (t + s) / 2,
                            M = b * -i * v / n + (e + u) / 2,
                            S = Math.asin(((e - M) / i).toFixed(9)),
                            A = Math.asin(((u - M) / i).toFixed(9));
                        S = t < _ ? Math.PI - S : S, A = s < _ ? Math.PI - A : A, S < 0 && (S = 2 * Math.PI + S), A < 0 && (A = 2 * Math.PI + A), a && S > A && (S -= 2 * Math.PI), !a && A > S && (A -= 2 * Math.PI)
                    }
                    var P = A - S;
                    if (Math.abs(P) > l) {
                        var T = A,
                            E = s,
                            C = u;
                        A = S + l * (a && A > S ? 1 : -1), s = _ + n * Math.cos(A), u = M + i * Math.sin(A), f = g(s, u, n, i, r, 0, a, E, C, [A, T, _, M])
                    }
                    P = A - S;
                    var I = Math.cos(S),
                        k = Math.sin(S),
                        B = Math.cos(A),
                        F = Math.sin(A),
                        N = Math.tan(P / 4),
                        O = 4 / 3 * n * N,
                        R = 4 / 3 * i * N,
                        z = [t, e],
                        D = [t + O * k, e - R * I],
                        G = [s + O * F, u - R * B],
                        X = [s, u];
                    if (D[0] = 2 * z[0] - D[0], D[1] = 2 * z[1] - D[1], c) return [D, G, X].concat(f);
                    f = [D, G, X].concat(f).join().split(",");
                    for (var Y = [], j = 0, L = f.length; j < L; j++) Y[j] = j % 2 ? p(f[j - 1], f[j], d).y : p(f[j], f[j + 1], d).x;
                    return Y
                },
                p = function (t, e) {
                    for (var n = l(t), i = e && l(e), r = {
                        x: 0,
                        y: 0,
                        bx: 0,
                        by: 0,
                        X: 0,
                        Y: 0,
                        qx: null,
                        qy: null
                    }, o = {
                        x: 0,
                        y: 0,
                        bx: 0,
                        by: 0,
                        X: 0,
                        Y: 0,
                        qx: null,
                        qy: null
                    }, a = (function (t, e, n) {
                        var i, r;
                        if (!t) return ["C", e.x, e.y, e.x, e.y, e.x, e.y];
                        switch (!(t[0] in {
                            T: 1,
                            Q: 1
                        }) && (e.qx = e.qy = null), t[0]) {
                        case "M":
                            e.X = t[1], e.Y = t[2];
                            break;
                        case "A":
                            t = ["C"].concat(g.apply(0, [e.x, e.y].concat(t.slice(1))));
                            break;
                        case "S":
                            "C" == n || "S" == n ? (i = 2 * e.x - e.bx, r = 2 * e.y - e.by) : (i = e.x, r = e.y), t = ["C", i, r].concat(t.slice(1));
                            break;
                        case "T":
                            "Q" == n || "T" == n ? (e.qx = 2 * e.x - e.qx, e.qy = 2 * e.y - e.qy) : (e.qx = e.x, e.qy = e.y), t = ["C"].concat(f(e.x, e.y, e.qx, e.qy, t[1], t[2]));
                            break;
                        case "Q":
                            e.qx = t[1], e.qy = t[2], t = ["C"].concat(f(e.x, e.y, t[1], t[2], t[3], t[4]));
                            break;
                        case "L":
                            t = ["C"].concat(d(e.x, e.y, t[1], t[2]));
                            break;
                        case "H":
                            t = ["C"].concat(d(e.x, e.y, t[1], e.y));
                            break;
                        case "V":
                            t = ["C"].concat(d(e.x, e.y, e.x, t[1]));
                            break;
                        case "Z":
                            t = ["C"].concat(d(e.x, e.y, e.X, e.Y))
                        }
                        return t
                    }), s = function (t, e) {
                        if (t[e].length > 7) {
                            t[e].shift();
                            for (var r = t[e]; r.length;) c[e] = "A", i && (h[e] = "A"), t.splice(e++, 0, ["C"].concat(r.splice(0, 6)));
                            t.splice(e, 1), x = Math.max(n.length, i && i.length || 0)
                        }
                    }, u = function (t, e, r, o, a) {
                        t && e && "M" == t[a][0] && "M" != e[a][0] && (e.splice(a, 0, ["M", o.x, o.y]), r.bx = 0, r.by = 0, r.x = t[a][1], r.y = t[a][2], x = Math.max(n.length, i && i.length || 0))
                    }, c = [], h = [], p = "", v = "", m = 0, x = Math.max(n.length, i && i.length || 0); m < x; m++) {
                        n[m] && (p = n[m][0]), "C" != p && (c[m] = p, m && (v = c[m - 1])), n[m] = a(n[m], r, v), "A" != c[m] && "C" == p && (c[m] = "C"), s(n, m), i && (i[m] && (p = i[m][0]), "C" != p && (h[m] = p, m && (v = h[m - 1])), i[m] = a(i[m], o, v), "A" != h[m] && "C" == p && (h[m] = "C"), s(i, m)), u(n, i, r, o, m), u(i, n, o, r, m);
                        var y = n[m],
                            w = i && i[m],
                            b = y.length,
                            _ = i && w.length;
                        r.x = y[b - 2], r.y = y[b - 1], r.bx = parseFloat(y[b - 4]) || r.x, r.by = parseFloat(y[b - 3]) || r.y, o.bx = i && (parseFloat(w[_ - 4]) || o.x), o.by = i && (parseFloat(w[_ - 3]) || o.y), o.x = i && w[_ - 2], o.y = i && w[_ - 1]
                    }
                    return i ? [n, i] : n
                },
                v = function (t, e, n, i) {
                    return null == t && (t = e = n = i = 0), null == e && (e = t.y, n = t.width, i = t.height, t = t.x), {
                        x: t,
                        y: e,
                        w: n,
                        h: i,
                        cx: t + n / 2,
                        cy: e + i / 2
                    }
                },
                m = /,?([a-z]),?/gi,
                x = function (t) {
                    return t.join(",").replace(m, "$1")
                },
                y = function (t, e, n, i, r) {
                    var o = -3 * e + 9 * n - 9 * i + 3 * r,
                        a = t * o + 6 * e - 12 * n + 6 * i;
                    return t * a - 3 * e + 3 * n
                },
                w = function (t, e, n, i, r, o, a, s, u) {
                    null == u && (u = 1), u = u > 1 ? 1 : u < 0 ? 0 : u;
                    for (var c = u / 2, h = 12, l = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], d = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], f = 0, g = 0; g < h; g++) {
                        var p = c * l[g] + c,
                            v = y(p, t, n, r, a),
                            m = y(p, e, i, o, s),
                            x = v * v + m * m;
                        f += d[g] * Math.sqrt(x)
                    }
                    return c * f
                },
                b = function (t, e, n, i, r, o, a, s) {
                    for (var u, c, h, l, d, f, g, p, v = [], m = [
                        [],
                        []
                    ], x = 0; x < 2; ++x)
                        if (0 == x ? (c = 6 * t - 12 * n + 6 * r, u = -3 * t + 9 * n - 9 * r + 3 * a, h = 3 * n - 3 * t) : (c = 6 * e - 12 * i + 6 * o, u = -3 * e + 9 * i - 9 * o + 3 * s, h = 3 * i - 3 * e), Math.abs(u) < 1e-12) {
                            if (Math.abs(c) < 1e-12) continue;
                            l = -h / c, 0 < l && l < 1 && v.push(l)
                        } else g = c * c - 4 * h * u, p = Math.sqrt(g), g < 0 || (d = (-c + p) / (2 * u), 0 < d && d < 1 && v.push(d), f = (-c - p) / (2 * u), 0 < f && f < 1 && v.push(f));
                    for (var y, w = v.length, b = w; w--;) l = v[w], y = 1 - l, m[0][w] = y * y * y * t + 3 * y * y * l * n + 3 * y * l * l * r + l * l * l * a, m[1][w] = y * y * y * e + 3 * y * y * l * i + 3 * y * l * l * o + l * l * l * s;
                    return m[0][b] = t, m[1][b] = e, m[0][b + 1] = a, m[1][b + 1] = s, m[0].length = m[1].length = b + 2, {
                        min: {
                            x: Math.min.apply(0, m[0]),
                            y: Math.min.apply(0, m[1])
                        },
                        max: {
                            x: Math.max.apply(0, m[0]),
                            y: Math.max.apply(0, m[1])
                        }
                    }
                },
                _ = function (t, e, n, i, r, o, a, s) {
                    if (!(Math.max(t, n) < Math.min(r, a) || Math.min(t, n) > Math.max(r, a) || Math.max(e, i) < Math.min(o, s) || Math.min(e, i) > Math.max(o, s))) {
                        var u = (t * i - e * n) * (r - a) - (t - n) * (r * s - o * a),
                            c = (t * i - e * n) * (o - s) - (e - i) * (r * s - o * a),
                            h = (t - n) * (o - s) - (e - i) * (r - a);
                        if (h) {
                            var l = u / h,
                                d = c / h,
                                f = +l.toFixed(2),
                                g = +d.toFixed(2);
                            if (!(f < +Math.min(t, n).toFixed(2) || f > +Math.max(t, n).toFixed(2) || f < +Math.min(r, a).toFixed(2) || f > +Math.max(r, a).toFixed(2) || g < +Math.min(e, i).toFixed(2) || g > +Math.max(e, i).toFixed(2) || g < +Math.min(o, s).toFixed(2) || g > +Math.max(o, s).toFixed(2))) return {
                                x: l,
                                y: d
                            }
                        }
                    }
                },
                M = function (t, e, n) {
                    return e >= t.x && e <= t.x + t.width && n >= t.y && n <= t.y + t.height
                },
                S = function (t, e, n, i, r) {
                    if (r) return [
                        ["M", +t + +r, e],
                        ["l", n - 2 * r, 0],
                        ["a", r, r, 0, 0, 1, r, r],
                        ["l", 0, i - 2 * r],
                        ["a", r, r, 0, 0, 1, -r, r],
                        ["l", 2 * r - n, 0],
                        ["a", r, r, 0, 0, 1, -r, -r],
                        ["l", 0, 2 * r - i],
                        ["a", r, r, 0, 0, 1, r, -r],
                        ["z"]
                    ];
                    var o = [
                        ["M", t, e],
                        ["l", n, 0],
                        ["l", 0, i],
                        ["l", -n, 0],
                        ["z"]
                    ];
                    return o.toString = toString, o
                },
                v = function (t, e, n, i) {
                    return null == t && (t = e = n = i = 0), null == e && (e = t.y, n = t.width, i = t.height, t = t.x), {
                        x: t,
                        y: e,
                        width: n,
                        w: n,
                        height: i,
                        h: i,
                        x2: t + n,
                        y2: e + i,
                        cx: t + n / 2,
                        cy: e + i / 2,
                        r1: Math.min(n, i) / 2,
                        r2: Math.max(n, i) / 2,
                        r0: Math.sqrt(n * n + i * i) / 2,
                        path: S(t, e, n, i),
                        vb: [t, e, n, i].join(" ")
                    }
                },
                A = function (t, e) {
                    return t = v(t), e = v(e), M(e, t.x, t.y) || M(e, t.x2, t.y) || M(e, t.x, t.y2) || M(e, t.x2, t.y2) || M(t, e.x, e.y) || M(t, e.x2, e.y) || M(t, e.x, e.y2) || M(t, e.x2, e.y2) || (t.x < e.x2 && t.x > e.x || e.x < t.x2 && e.x > t.x) && (t.y < e.y2 && t.y > e.y || e.y < t.y2 && e.y > t.y)
                },
                P = function (t, e, n, r, o, a, s, u) {
                    i.isArray(t) || (t = [t, e, n, r, o, a, s, u]);
                    var c = b.apply(null, t);
                    return v(c.min.x, c.min.y, c.max.x - c.min.x, c.max.y - c.min.y)
                },
                T = function (t, e, n, i, o, a, s, u, c) {
                    var h = 1 - c,
                        l = Math.pow(h, 3),
                        d = Math.pow(h, 2),
                        f = c * c,
                        g = f * c,
                        p = l * t + 3 * d * c * n + 3 * h * c * c * o + g * s,
                        v = l * e + 3 * d * c * i + 3 * h * c * c * a + g * u,
                        m = t + 2 * c * (n - t) + f * (o - 2 * n + t),
                        x = e + 2 * c * (i - e) + f * (a - 2 * i + e),
                        y = n + 2 * c * (o - n) + f * (s - 2 * o + n),
                        w = i + 2 * c * (a - i) + f * (u - 2 * a + i),
                        b = h * t + c * n,
                        _ = h * e + c * i,
                        M = h * o + c * s,
                        S = h * a + c * u,
                        A = 90 - 180 * Math.atan2(m - y, x - w) / r;
                    return {
                        x: p,
                        y: v,
                        m: {
                            x: m,
                            y: x
                        },
                        n: {
                            x: y,
                            y: w
                        },
                        start: {
                            x: b,
                            y: _
                        },
                        end: {
                            x: M,
                            y: S
                        },
                        alpha: A
                    }
                },
                E = function (t, e, n) {
                    var i = P(t),
                        r = P(e);
                    if (!A(i, r)) return n ? 0 : [];
                    for (var o = w.apply(0, t), a = w.apply(0, e), s = ~~ (o / 8), u = ~~ (a / 8), c = [], h = [], l = {}, d = n ? 0 : [], f = 0; f < s + 1; f++) {
                        var g = T.apply(0, t.concat(f / s));
                        c.push({
                            x: g.x,
                            y: g.y,
                            t: f / s
                        })
                    }
                    for (f = 0; f < u + 1; f++) g = T.apply(0, e.concat(f / u)), h.push({
                        x: g.x,
                        y: g.y,
                        t: f / u
                    });
                    for (f = 0; f < s; f++)
                        for (var p = 0; p < u; p++) {
                            var v = c[f],
                                m = c[f + 1],
                                x = h[p],
                                y = h[p + 1],
                                b = Math.abs(m.x - v.x) < .001 ? "y" : "x",
                                M = Math.abs(y.x - x.x) < .001 ? "y" : "x",
                                S = _(v.x, v.y, m.x, m.y, x.x, x.y, y.x, y.y);
                            if (S) {
                                if (l[S.x.toFixed(4)] == S.y.toFixed(4)) continue;
                                l[S.x.toFixed(4)] = S.y.toFixed(4);
                                var E = v.t + Math.abs((S[b] - v[b]) / (m[b] - v[b])) * (m.t - v.t),
                                    C = x.t + Math.abs((S[M] - x[M]) / (y[M] - x[M])) * (y.t - x.t);
                                E >= 0 && E <= 1 && C >= 0 && C <= 1 && (n ? d++ : d.push({
                                    x: S.x,
                                    y: S.y,
                                    t1: E,
                                    t2: C
                                }))
                            }
                        }
                    return d
                },
                C = function (t, e, n) {
                    t = p(t), e = p(e);
                    for (var i, r, o, a, s, u, c, h, l, d, f = n ? 0 : [], g = 0, v = t.length; g < v; g++) {
                        var m = t[g];
                        if ("M" == m[0]) i = s = m[1], r = u = m[2];
                        else {
                            "C" == m[0] ? (l = [i, r].concat(m.slice(1)), i = l[6], r = l[7]) : (l = [i, r, i, r, s, u, s, u], i = s, r = u);
                            for (var x = 0, y = e.length; x < y; x++) {
                                var w = e[x];
                                if ("M" == w[0]) o = c = w[1], a = h = w[2];
                                else {
                                    "C" == w[0] ? (d = [o, a].concat(w.slice(1)), o = d[6], a = d[7]) : (d = [o, a, o, a, c, h, c, h], o = c, a = h);
                                    var b = E(l, d, n);
                                    if (n) f += b;
                                    else {
                                        for (var _ = 0, M = b.length; _ < M; _++) b[_].segment1 = g, b[_].segment2 = x, b[_].bez1 = l, b[_].bez2 = d;
                                        f = f.concat(b)
                                    }
                                }
                            }
                        }
                    }
                    return f
                },
                I = function (t, e) {
                    return C(t, e)
                },
                k = {
                    toArray: u,
                    toString: x,
                    toCurve: p,
                    toAbsolute: l,
                    catmullRomToBezier: c,
                    rectPath: S,
                    intersection: I
                };
            t.exports = k
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(11),
                o = n(111),
                a = function (t) {
                    a.superclass.constructor.call(this, t), this._init()
                };
            a.ATTRS = {
                time: 0,
                createTime: null,
                playTime: null,
                pauseTimeSpace: 0,
                available: !1,
                canvases: [],
                tweens: [],
                endTime: 0,
                autoPlay: !1,
                status: "silent",
                autoDraw: !0
            }, i.extend(a, r), i.augment(a, {
                _init: function () {
                    var t = this.get("autoPlay");
                    this.set("createTime", +new Date), t && this.play()
                }, _trySetEndTime: function (t) {
                    var e = this;
                    i.isObject(t) ? e._setEndTime(t) : i.isArray(t) && i.each(t, function (t, n) {
                        e._setEndTime(t)
                    })
                }, _trySetCanvases: function (t) {
                    var e = this;
                    i.isObject(t) ? e._setCanvases(t) : i.isArray(t) && i.each(t, function (t, n) {
                        e._setCanvases(t)
                    })
                }, _setEndTime: function (t) {
                    var e = this.get("endTime"),
                        n = t.endTime;
                    n > e && this.set("endTime", n)
                }, _setCanvases: function (t) {
                    var e = t.canvas,
                        n = this.get("canvases");
                    n.indexOf(e) === -1 && n.push(e)
                }, _resetTweens: function () {
                    var t = this.get("tweens");
                    t.sort(function (t, e) {
                        return e.get("startTime") - t.get("startTime")
                    }), i.each(t, function (t) {
                        t.reset()
                    })
                }, _getTime: function () {
                    var t = this.get("playTime"),
                        e = this.get("pauseTimeSpace");
                    return +new Date - t + e
                }, _refresh: function (t) {
                    for (var e, n, r = this.get("tweens"), o = (this.get("canvases"), this.get("autoDraw")), a = [], s = [], u = 0; u < r.length; u++) n = r[u], e = n.canvas, n.needsDestroy ? n.destroy() : n.destroyed || n.needsDestroy || n.tryStep(t), n.destroyed || a.push(n), i.inArray(s, e) || n.destroyed || s.push(e);
                    o && this.draw(), r.length > 0 && 0 === a.length && this.fire("animateend"), this.set("canvases", s), this.set("tweens", a)
                }, _update: function () {
                    if (this.get("available")) {
                        var t, e = this,
                            n = e.get("tweens");
                        n.length > 0 && (t = e._getTime(), e._refresh(t)), e.fire("update"), i.requestAnimationFrame(function () {
                            e._update()
                        })
                    }
                }, animate: function (t, e) {
                    var n = new o({
                        target: t,
                        timeline: this,
                        startTime: e ? e : 0
                    });
                    return n
                }, add: function (t) {
                    var e, n = this.get("tweens");
                    return i.isArray(t) ? e = n.concat(t) : i.isObject(t) && "tween" === t.type ? (n.push(t), e = n) : console.error("Timeline not Support this type"), this.set("tweens", e), this._trySetCanvases(t), this._trySetEndTime(t), this
                }, getNow: function () {
                    var t = this.get("playTime");
                    return t ? +new Date - t : 0
                }, getTime: function () {
                    var t = this.get("playTime");
                    return t ? +new Date - t : 0
                }, play: function () {
                    var t = this.get("status");
                    return "silent" === t && (this.set("playTime", +new Date), this.set("available", !0), this.set("status", "playing"), this._update()), this
                }, stop: function () {
                    this.set("status", "silent"), this.set("available", !1), this.set("pauseTimeSpace", 0), this._resetTweens(), this._refresh(0), this.draw()
                }, pause: function () {
                    var t = this.get("available");
                    return t && this.set("pauseTimeSpace", +new Date - this.get("playTime")), this.set("available", !1), this.set("status", "silent"), this
                }, reset: function () {
                    this.set("status", "silent"), this.set("available", !1), this.set("pauseTimeSpace", 0), this.set("playTime", 0), this.set("endTime", 0), this.set("tweens", []), this.set("canvases", [])
                }, draw: function () {
                    for (var t, e = this.get("canvases"), n = 0; n < e.length; n++) t = e[n], !t.get("destroyed") && t.draw()
                }
            }), t.exports = a
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(57),
                o = (n(11), n(58)),
                a = function (t) {
                    i.mix(this, t)
                };
            i.augment(a, {
                target: null,
                timeline: null,
                startTime: null,
                append: function (t, e, n, a) {
                    var s, u = i.guid("tween_"),
                        c = this.target,
                        h = (this.tweens, this.timeline),
                        l = this.startTime,
                        d = r.getKeyFrameByProps(c, e),
                        f = d[0],
                        g = d[1],
                        p = r.getInterpolations(f, g);
                    return p.matrix || 0 !== r.getObjectLength(p.attrs) || g.onUpdate ? (t = t ? t : l, e && e.delay && (t += e.delay), s = new o({
                        id: u,
                        canvas: c.get("canvas"),
                        startTime: t,
                        target: c,
                        easing: n,
                        callBack: a,
                        startKeyFrame: f,
                        endKeyFrame: g,
                        interpolations: p,
                        duration: e.duration ? e.duration : 1e3,
                        repeat: !!e.repeat && e.repeat,
                        destroyTarget: !!e.destroy && e.destroy
                    }), h && h.add(s), this) : this
                }
            }), t.exports = a
        },
        function (t, e, n) {
            var i = n(113);
            t.exports = i
        },
        function (t, e) {
            "use strict";

            function n(t, e, i) {
                i = i || 0;
                for (var r in e)
                    if (e.hasOwnProperty(r)) {
                        var s = e[r];
                        null !== s && a.isObject(s) ? (a.isObject(t[r]) || (t[r] = {}), i < o ? n(t[r], e[r], i + 1) : t[r] = e[r]) : a.isArray(s) ? (t[r] = [], t[r] = t[r].concat(s)) : void 0 !== s && (t[r] = e[r])
                    }
            }
            var i = Object.prototype,
                r = i.toString,
                o = 5,
                a = {
                    substitute: function (t, e) {
                        return t && e ? t.replace(/\\?\{([^{}]+)\}/g, function (t, n) {
                            return "\\" === t.charAt(0) ? t.slice(1) : void 0 === e[n] ? "" : e[n]
                        }) : t
                    }, ucfirst: function (t) {
                        return t += "", t.charAt(0).toUpperCase() + t.substring(1)
                    }, isString: function (t) {
                        return "string" == typeof t
                    }, isNumber: function (t) {
                        return "number" == typeof t
                    }, isNumeric: function (t) {
                        return !isNaN(parseFloat(t)) && isFinite(t)
                    }, isBoolean: function (t) {
                        return "boolean" == typeof t
                    }, isFunction: function (t) {
                        return "function" == typeof t
                    }, isArray: "isArray" in Array ? Array.isArray : function (t) {
                        return "[object Array]" === r.call(t)
                    }, isDate: function (t) {
                        return "[object Date]" === r.call(t)
                    }, isNull: function (t) {
                        return void 0 === t || null === t
                    }, notNull: function (t) {
                        return !a.isNull(t)
                    }, isBlank: function (t) {
                        if (a.isArray(t)) return 0 === t.length;
                        if (a.isObject(t)) {
                            var e = 0;
                            return a.each(t, function (t, n) {
                                e++
                            }), 0 === e
                        }
                        return !1
                    }, isObject: "[object Object]" === r.call(null) ? function (t) {
                        return null !== t && void 0 !== t && "[object Object]" === r.call(t) && void 0 === t.ownerDocument
                    } : function (t) {
                        return "[object Object]" === r.call(t)
                    }, extend: function (t, e, n, i) {
                        a.isFunction(e) || (n = e, e = t, t = function () {});
                        var r = Object.create ? function (t, e) {
                                return Object.create(t, {
                                    constructor: {
                                        value: e
                                    }
                                })
                            } : function (t, e) {
                                function n() {}
                                n.prototype = t;
                                var i = new n;
                                return i.constructor = e, i
                            },
                            o = r(e.prototype, t);
                        return t.prototype = a.mix(o, t.prototype), t.superclass = r(e.prototype, e), a.mix(o, n), a.mix(t, i), t
                    }, augment: function (t) {
                        for (var e = a.toArray(arguments), n = 1; n < e.length; n++) {
                            var i = e[n];
                            a.isFunction(i) && (i = i.prototype), a.mix(t.prototype, i)
                        }
                    }, toArray: function (t) {
                        return t && t.length ? Array.prototype.slice.call(t) : []
                    }, mix: function () {
                        var t = a.toArray(arguments),
                            e = t[0];
                        if (e === !0) {
                            e = t[1];
                            for (var i = 2; i < t.length; i++) {
                                var r = t[i];
                                n(e, r)
                            }
                        } else
                            for (var i = 1; i < t.length; i++) {
                                var r = t[i];
                                for (var o in r) r.hasOwnProperty(o) && "constructor" !== o && (e[o] = r[o])
                            }
                        return e
                    }, each: function (t, e) {
                        if (t)
                            if (a.isObject(t)) {
                                for (var n in t)
                                    if (t.hasOwnProperty(n)) {
                                        var i = e(t[n], n);
                                        if (i === !1) break
                                    }
                            } else if (t.length)
                            for (var r = 0; r < t.length; r++) {
                                var i = e(t[r], r);
                                if (i === !1) break
                            }
                    }, requestAnimationFrame: function (t) {
                        var e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (t) {
                            return setTimeout(t, 16)
                        };
                        return e(t)
                    }, cancelAnimationFrame: function (t) {
                        var e = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function (t) {
                            return clearTimeout(t)
                        };
                        return e(t)
                    }
                };
            t.exports = a
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                var n = e.toString(),
                    i = n.indexOf(".");
                if (i === -1) return Math.round(t);
                var r = n.substr(i + 1).length;
                return r > 20 && (r = 20), parseFloat(t.toFixed(r))
            }

            function r(t, e) {
                for (var n in e) e.hasOwnProperty(n) && "constructor" !== n && void 0 !== e[n] && (t[n] = e[n])
            }
            var o = n(112);
            o.mix(o, {
                mixin: function (t, e) {
                    if (t && e) {
                        t._mixins = e, t.ATTRS = t.ATTRS || {};
                        var n = {};
                        o.each(e, function (e) {
                            o.augment(t, e);
                            var i = e.ATTRS;
                            i && o.mix(n, i)
                        }), t.ATTRS = o.mix(n, t.ATTRS)
                    }
                }, map: function (t, e) {
                    var n = [];
                    return o.each(t, function (t, i) {
                        n.push(e(t, i))
                    }), n
                }, filter: function (t, e) {
                    var n = [];
                    return o.each(t, function (t, i) {
                        e(t, i) && n.push(t)
                    }), n
                }, guid: function () {
                    var t = {};
                    return function (e) {
                        return e = e || "g", t[e] ? t[e] += 1 : t[e] = 1, e + t[e]
                    }
                }(),
                inArray: function (t, e) {
                    return o.indexOf(t, e) !== -1
                }, indexOf: function (t, e) {
                    var n = Array.prototype.indexOf;
                    if (n) return n.call(t, e);
                    for (var i = -1, r = 0; r < t.length; r++)
                        if (t[r] === e) {
                            i = r;
                            break
                        }
                    return i
                }, remove: function (t, e) {
                    var n = o.indexOf(t, e);
                    n !== -1 && t.splice(n, 1)
                }, empty: function (t) {
                    if (!(t instanceof Array))
                        for (var e = t.length - 1; e >= 0; e--) delete t[e];
                    t.length = 0
                }, equalsArray: function (t, e) {
                    if (t === e) return !0;
                    if (!t || !e) return !1;
                    if (t.length !== e.length) return !1;
                    for (var n = !0, i = 0; i < t.length; i++)
                        if (t[i] !== e[i]) {
                            n = !1;
                            break
                        }
                    return n
                }, wrapBehavior: function (t, e) {
                    var n = function (n) {
                        t[e](n)
                    };
                    return t["_wrap_" + e] = n, n
                }, getWrapBehavior: function (t, e) {
                    return t["_wrap_" + e]
                }, fixedBase: function (t, e) {
                    return i(t, e)
                }, length: function (t) {
                    if (o.isArray(t)) return t.length;
                    if (o.isObject(t)) {
                        var e = 0;
                        return o.each(t, function () {
                            e++
                        }), e
                    }
                    return 0
                }, clone: function (t) {
                    if ("object" != typeof t || null === t) return t;
                    var e;
                    if (o.isArray(t)) {
                        e = [];
                        for (var n = 0, i = t.length; n < i; n++) "object" == typeof t[n] && null != t[n] ? e[n] = o.clone(t[n]) : e[n] = t[n]
                    } else {
                        e = {};
                        for (var r in t) "object" == typeof t[r] && null != t[r] ? e[r] = o.clone(t[r]) : e[r] = t[r]
                    }
                    return e
                }, simpleMix: function (t, e, n, i) {
                    return e && r(t, e), n && r(t, n), i && r(t, i), t
                }
            }), t.exports = o
        },
        function (t, e, n) {
            "use strict";
            var i = n(25),
                r = n(3);
            t.exports = function (t) {
                var e = r.getBBox(t, t),
                    n = e.centerX,
                    o = e.centerY;
                i.scaleIn(t, n, o)
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(25),
                r = n(3);
            t.exports = function (t) {
                var e = r.getBBox(t, t),
                    n = e.centerX,
                    o = e.centerY;
                i.scaleOut(t, n, o)
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(7);
            t.exports = function (t, e) {
                t.set("capture", !1), setTimeout(function () {
                    t.set("capture", !0)
                }, i.updateDuration + 32), t.animate(e, i.updateDuration, i.updateEasing)
            }
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                if (!t || !e) return !1;
                var n = t.length,
                    i = e.length,
                    r = i > n ? e : t,
                    o = {
                        attrs0: {},
                        attrs1: {}
                    },
                    s = !1,
                    u = void 0,
                    h = void 0,
                    l = void 0,
                    d = void 0;
                return a.each(r, function (n, i) {
                    u = t[i], h = e[i], a.isObject(u) || a.isObject(h) || "path" === i && (l = a.isString(u) ? u : a.pathToString(u), d = a.isString(h) ? h : a.pathToString(h), l === d || l.indexOf("NaN") !== -1 || d.indexOf("NaN") !== -1) || a.isArray(u) && a.isArray(h) && a.equalsArray(u, h) || u === h || c[i] || (o.attrs0[i] = u, o.attrs1[i] = h, s = !0)
                }), !!s && o
            }

            function r(t, e, n) {
                var i = e.get("children"),
                    o = void 0,
                    s = void 0;
                return a.each(i, function (e) {
                    n++, s = e.get("gid"), e.isGroup && (n = r(t, e, n)), s && (t[s] = {
                        matrix: e.getMatrix().clone(),
                        origin: e
                    }, o = e.get("shapeCfg"), o && (t[s].enterAnimate = e.get("enterAnimate"), t[s].leaveAnimate = e.get("leaveAnimate"), t[s].model = o.origin), e.isShape && (t[s].attrs = e.getAllAttrs()))
                }), n
            }
            var o = n(4),
                a = n(3),
                s = n(24),
                u = o.Matrix3,
                c = {
                    text: "text",
                    elements: "elements",
                    rotate: "rotate",
                    textAlign: "textAlign",
                    textBaseline: "textBaseline",
                    fontStyle: "fontStyle",
                    font: "font",
                    fontWeight: "fontWeight",
                    fontFamily: "fontFamily"
                },
                h = function (t) {
                    a.mix(this, t)
                };
            a.augment(h, {
                canvas: null,
                map0: null,
                map1: null,
                run: function () {
                    this.init(), this.count < 5e3 && (this._compare(), this._addTween()), a.each(this.canvases, function (t) {
                        t.draw()
                    })
                }, init: function () {
                    var t = this.canvases,
                        e = this.elementsStash,
                        n = {},
                        i = 0;
                    e = e ? e : {}, a.each(t, function (t) {
                        i += r(n, t, 0)
                    }), this.elementsStash = n, this.map0 = e, this.map1 = n, this.count = i
                }, _compare: function () {
                    var t = this.map0,
                        e = this.map1,
                        n = [],
                        i = [],
                        r = [];
                    a.each(e, function (e, i) {
                        t[i] ? e.origin.get("type") === t[i].origin.get("type") && r.push(i) : n.push(i)
                    }), a.each(t, function (t, n) {
                        e[n] || i.push(n)
                    }), this.enterElements = n, this.leaveElements = i, this.updateElements = r
                }, _addTween: function () {
                    var t = this,
                        e = this.enterElements,
                        n = this.leaveElements,
                        r = this.updateElements,
                        o = this.map0,
                        c = this.map1,
                        h = void 0,
                        l = void 0,
                        d = void 0,
                        f = void 0,
                        g = void 0;
                    a.each(e, function (t) {
                        g = c[t], g.enterAnimate && g.enterAnimate(g.origin, o, c)
                    }), a.each(n, function (t) {
                        f = o[t], f.leaveAnimate && (f.origin.getParent().add(f.origin), f.leaveAnimate(f.origin, o, c))
                    }), a.each(r, function (e) {
                        g = c[e], f = o[e], l = i(f.attrs, g.attrs), h = u.equal(f.matrix, g.matrix), d = {}, l && (g.origin.attr(l.attrs0), a.mix(d, l.attrs1)), h || (g.origin.setMatrix(f.matrix), d.matrix = g.matrix), !l && h || s.update(g.origin, d, t), f.origin !== g.origin && f.origin.remove()
                    })
                }
            }), t.exports = h
        },
        function (t, e, n) {
            "use strict";

            function i(t, e, n) {
                return t.addEventListener ? (t.addEventListener(e, n, !1), {
                    remove: function () {
                        t.removeEventListener(e, n, !1)
                    }
                }) : t.attachEvent ? (t.attachEvent("on" + e, n), {
                    remove: function () {
                        t.detachEvent("on" + e, n)
                    }
                }) : void 0
            }
            var r = n(3),
                o = function (t) {
                    r.mix(this, t), this.init()
                };
            r.augment(o, {
                graph: null,
                frontCanvas: null,
                canvas: null,
                currentItem: null,
                dragitem: null,
                rootGroup: null,
                lastEventObj: null,
                currentEventObj: null,
                el: null,
                init: function () {
                    var t = this.graph;
                    this.frontCanvas = t.get("frontCanvas"), this.canvas = t.get("canvas"), this._initEvent()
                }, _initEvent: function () {
                    var t = this,
                        e = t.frontCanvas,
                        n = e.get("el");
                    this.el = n, this.domMouseEnter = i(n, "mouseenter", r.wrapBehavior(t, "onDomMouseEnter")), this.domMouseLeave = i(n, "mouseleave", r.wrapBehavior(t, "onDomMouseLeave")), this.domMouseDown = i(n, "mousedown", r.wrapBehavior(t, "onMouseDown")), this.domMouseUp = i(n, "mouseup", r.wrapBehavior(t, "onMouseUp")), this.domMouseMove = i(n, "mousemove", r.wrapBehavior(t, "onMouseMove")), this.domDblClick = i(n, "dblclick", r.wrapBehavior(t, "onDblClick")), this.domMouseWheel = i(n, "mousewheel", r.wrapBehavior(t, "onMouseWheel")), this.domKeyDown = i(n, "keydown", r.wrapBehavior(t, "onKeyDown")), this.domKeyUp = i(n, "keyup", r.wrapBehavior(t, "onKeyUp")), this.domContextMenu = i(n, "contextmenu", r.wrapBehavior(t, "onContextMenu")), this.domOnFocus = i(n, "focus", r.wrapBehavior(t, "onFocus")), this.domOnBlur = i(n, "blur", r.wrapBehavior(t, "onBlur"))
                }, _parsePoint: function (t, e) {
                    var n = this.canvas.get("pixelRatio"),
                        i = this.graph,
                        r = {
                            x: t / n,
                            y: e / n
                        };
                    return i.invertPoint(r)
                }, _getEventObj: function (t, e) {
                    var n = this.graph,
                        i = t.clientX,
                        r = t.clientY,
                        o = e.getPointByClient(i, r),
                        a = this._parsePoint(o.x, o.y),
                        s = e.getShape(o.x, o.y),
                        u = n.getItem(s),
                        c = void 0;
                    return u && (c = u.get("type")), {
                        item: u,
                        itemType: c,
                        shape: s,
                        x: a.x,
                        y: a.y,
                        domX: t.offsetX,
                        domY: t.offsetY,
                        domEvent: t
                    }
                }, getEventObj: function (t) {
                    return {
                        item: t.item,
                        itemType: t.itemType,
                        x: t.x,
                        y: t.y,
                        domX: t.domX,
                        domY: t.domY,
                        shape: t.shape,
                        toEvObj: t.toEvObj,
                        frontEvObj: t.frontEvObj,
                        domEvent: t.domEvent
                    }
                }, _processEventObj: function (t) {
                    var e = this.canvas,
                        n = this.frontCanvas,
                        i = this.currentEventObj;
                    i && r.isObject(i) && (this.lastEventObj = r.mix({}, i));
                    var o = this._getEventObj(t, e),
                        a = this._getEventObj(t, n);
                    a.shape && (o.shape = a.shape), a.item && (o.item = a.item, o.itemType = a.item.get("type")), o.frontEvObj = a, this.currentEventObj = o, this.currentItem = o.item
                }, onFocus: function () {
                    this.graph.fire("domfocus")
                }, onBlur: function () {
                    this.graph.fire("domblur")
                }, onDomMouseEnter: function (t) {
                    this.graph.fire("dommouseenter", t)
                }, onDomMouseLeave: function (t) {
                    this.graph.fire("dommouseleave", t)
                }, onContextMenu: function (t) {
                    this._processEventObj(t);
                    var e = this.currentEventObj;
                    this.graph.fire("contextmenu", this.getEventObj(e))
                }, onDblClick: function (t) {
                    this._processEventObj(t);
                    var e = this.currentEventObj;
                    this.graph.fire("dblclick", this.getEventObj(e))
                }, onKeyUp: function (t) {
                    this.graph.fire("keyup", t)
                }, onKeyDown: function (t) {
                    this.graph.fire("keydown", t)
                }, onMouseWheel: function (t) {
                    this._processEventObj(t);
                    var e = this.currentEventObj;
                    this.graph.fire("mousewheel", this.getEventObj(e))
                }, onMouseDown: function (t) {
                    this._processEventObj(t);
                    var e = this.currentEventObj;
                    0 === t.button && (this.pressing = !0, this.dragging = !0, this.pressingPoint = {
                        x: e.x,
                        y: e.y
                    }, this.graph.fire("mousedown", this.getEventObj(e)), e.item && this.graph.fire("itemmousedown", this.getEventObj(e)))
                }, onMouseUp: function (t) {
                    this._processEventObj(t);
                    var e = this.currentEventObj;
                    0 === t.button && (this.pressing && (this.graph.fire("click", this.getEventObj(e)), e.item && this.graph.fire("itemclick", this.getEventObj(e)), this.pressing = !1), this.dragging && (this.dragStartPoint && this.graph.fire("dragend", this.getEventObj(e)), this.dragging = !1), this.graph.fire("mouseup", this.getEventObj(e)), e.item && this.graph.fire("itemmouseup", this.getEventObj(e)), this.dragStartPoint = null, this.dragItem = null)
                }, onMouseMove: function (t) {
                    this._processEventObj(t);
                    var e = this.graph,
                        n = this.currentEventObj,
                        i = this.lastEventObj;
                    this.pressing === !0 && n.x === i.x && n.y === i.y || (this.pressing = !1, i && n && (i.toEvObj = n, n.fromEvObj = i, this.isSame(i, n, "shape") || (i.shape && !i.shape.get("destroyed") && e.fire("mouseleave", this.getEventObj(i)), n.shape && !n.shape.get("destroyed") && e.fire("mouseenter", this.getEventObj(n))), this.isSame(i, n, "item") || (i.item && !i.item.destroyed && e.fire("itemmouseleave", this.getEventObj(i)), n.item && !n.item.destroyed && e.fire("itemmouseenter", this.getEventObj(n)))), this.dragging && (this.dragStartPoint ? e.fire("dragmove", this.getEventObj(n)) : (this.dragStartPoint = {
                        x: n.x,
                        y: n.y
                    }, this.dragItem = n.item, e.fire("dragstart", this.getEventObj(n)))), n.item && e.fire("itemhover", this.getEventObj(n)), e.fire("mousemove", this.getEventObj(n)))
                }, isSame: function (t, e, n) {
                    var i = t[n],
                        r = e[n];
                    return i === r
                }, destroy: function () {
                    var t = this.domMouseUp,
                        e = this.domMouseDown,
                        n = this.domMouseMove,
                        i = this.domDblClick,
                        r = this.domMouseWheel,
                        o = this.domContextMenu,
                        a = this.domKeyDown,
                        s = this.domKeyUp,
                        u = this.domOnFocus,
                        c = this.domOnBlur,
                        h = this.dommouseleave,
                        l = this.domMouseEnter;
                    o && o.remove(), s && s.remove(), r && r.remove(), a && a.remove(), i && i.remove(), t && t.remove(), e && e.remove(), n && n.remove(), h && h.remove(), l && l.remove(), u && u.remove(), c && c.remove()
                }
            }), t.exports = o
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = function (t) {
                    i.mix(this, t), this.init()
                };
            i.augment(r, {
                group: null,
                visible: !0,
                gridEl: null,
                minX: 0,
                minY: 0,
                cell: 10,
                maxX: 1e3,
                maxY: 1e3,
                line: null,
                init: function () {
                    var t = this,
                        e = t.group,
                        n = t._getPath(),
                        r = i.mix({}, t.line);
                    r.path = n;
                    var o = e.addShape("path", {
                        attrs: r,
                        capture: !1
                    });
                    o.set("visible", t.visible), this.gridEl = o
                }, _getPath: function () {
                    for (var t = this, e = t.minX, n = t.minY, i = t.maxX, r = t.maxY, o = t._getCell(), a = Math.ceil(e / o) * o, s = Math.ceil(n / o) * o, u = [], c = 0; c <= i - e; c += o) {
                        var h = a + c;
                        u.push(["M", h, n]), u.push(["L", h, r])
                    }
                    for (var l = 0; l <= r - n; l += o) {
                        var d = s + l;
                        u.push(["M", e, d]), u.push(["L", i, d])
                    }
                    return u
                }, _getCell: function () {
                    var t = this.cell ? this.cell : 10;
                    return t
                }, update: function (t) {
                    i.mix(this, t);
                    var e = this._getPath(),
                        n = this.gridEl;
                    n.attr("path", e), n.set("visible", this.visible)
                }, destroy: function () {
                    var t = this,
                        e = t.gridEl;
                    e && e.remove()
                }
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(3),
                r = n(26),
                o = function (t) {
                    i.mix(this, t), this.init()
                };
            i.augment(o, {
                graph: null,
                guides: [],
                frontGuideGroup: null,
                backGuideGroup: null,
                init: function () {
                    var t = this.graph,
                        e = t.get("frontGroup").addGroup(),
                        n = t.get("backGroup").addGroup();
                    this.frontGuideGroup = e, this.backGuideGroup = n
                }, link: function (t) {
                    this.guides.push({
                        type: "link",
                        cfg: t
                    })
                }, _link: function (t) {
                    var e = this.guides,
                        n = this.graph,
                        o = n.find(t.source),
                        a = n.find(t.target);
                    if (!o || !a) return !1;
                    var s = t.id ? t.id : "guide-link-" + e.length,
                        u = this.frontGuideGroup,
                        c = u.addGroup(r, {
                            data: {
                                type: "link",
                                cfg: t
                            },
                            id: s
                        }),
                        h = o.getCenter(),
                        l = a.getCenter(),
                        d = o.getIntersectionByPoint(l),
                        f = a.getIntersectionByPoint(h),
                        g = i.mix({}, t, {
                            source: o,
                            target: a,
                            points: [d, f]
                        }),
                        p = t.shape ? t.shape : "line";
                    return i.drawEdge(p, g, c), c
                }, draw: function () {
                    var t = this,
                        e = this.guides;
                    i.each(e, function (e) {
                        t["_" + e.type](e.cfg)
                    })
                }, save: function () {
                    return this.guides
                }, remove: function () {}, clear: function (t) {
                    this.frontGuideGroup.clear(t), this.backGuideGroup.clear(t)
                }, destroy: function () {
                    this.frontGuideGroup.clear(), this.backGuideGroup.clear()
                }
            }), t.exports = o
        },
        function (t, e, n) {
            "use strict";
            var i = n(3),
                r = n(7),
                o = function (t) {
                    i.mix(this, t), this.init()
                };
            i.augment(o, {
                graph: null,
                tooltipDOM: null,
                titleDOM: null,
                listDOM: null,
                tooltipCSS: {
                    border: "none",
                    "border-radius": "4px",
                    background: "rgba(33,33,33,0.7)",
                    color: "white",
                    "font-size": "14px",
                    margin: 0,
                    padding: "8px 16px"
                },
                titleCSS: {
                    margin: 0
                },
                listCSS: {
                    margin: 0,
                    "list-style-type": "none",
                    padding: "0px"
                },
                title: "",
                dx: 10,
                dy: 10,
                margin: 10,
                split: ": ",
                timer: setTimeout(function () {}),
                tooltipHtml: '<div class="g6-tooltip" style="position: absolute;white-space:nowrap;z-index: 5;"></div>',
                titleHtml: '<h4 class="g6-tooltip-title"></h4>',
                listHtml: '<ul class="g6-tooltip-list"></ul>',
                liTpl: "<li><span>{name}</span>{split}{value}</li>",
                custom: !1,
                init: function () {
                    var t = this.custom;
                    t || this._createDOM(), this._bindEvent()
                }, _createDOM: function () {
                    var t = this.graph,
                        e = t.get("graphContainer"),
                        n = i.createDOM(this.tooltipHtml, this.tooltipCSS),
                        r = i.createDOM(this.titleHtml, this.titleCSS),
                        o = i.createDOM(this.listHtml, this.listCSS);
                    e.appendChild(n), n.appendChild(r), n.appendChild(o), n.hide(), r.innerHTML = this.title, this.titleDOM = r, this.listDOM = o, this.tooltipDOM = n
                }, _bindEvent: function () {
                    var t = this.graph;
                    t.on("itemmouseenter", i.wrapBehavior(this, "onMouseenter")), t.on("itemhover", i.wrapBehavior(this, "onItemhover")), t.on("itemmouseleave", i.wrapBehavior(this, "onMouseleave")), t.on("dommouseleave", i.wrapBehavior(this, "onDomMouseleave"))
                }, _changeContent: function (t) {
                    var e = this,
                        n = this.listDOM,
                        r = this.liTpl,
                        o = "";
                    t && (i.isArray(t[0]) || (t = [t]), i.each(t, function (t) {
                        o += i.substitute(r, {
                            name: t[0],
                            value: t[1],
                            split: e.split
                        })
                    }), n.innerHTML = o)
                }, _getTop: function (t, e, n) {
                    var i = this.dy;
                    return 2 * t.height >= e.height ? "0px" : n < t.height + i ? n + i + "px" : n - t.height - i + "px"
                }, _getLeft: function (t, e, n) {
                    var i = this.dx;
                    return 2 * t.width >= e.width ? "0px" : e.width - n - i < t.width ? n - t.width - i + "px" : n + i + "px"
                }, _changePositon: function (t) {
                    var e = this.tooltipDOM,
                        n = this.graph.get("htmlElementContaniner"),
                        i = {
                            x: 0,
                            y: 0,
                            width: e.width() + e.paddingRight() + e.paddingLeft(),
                            height: e.height() + e.paddingTop() + e.paddingBottom()
                        },
                        r = {
                            x: 0,
                            y: 0,
                            width: n.width(),
                            height: n.height()
                        },
                        o = t.domX,
                        a = t.domY;
                    e.css({
                        top: this._getTop(i, r, a),
                        left: this._getLeft(i, r, o)
                    })
                }, onMouseenter: function (t) {
                    var e = this.custom;
                    if (e) this.show(t);
                    else {
                        var n = t.item.getShapeCfg().tooltip;
                        n && (this._changeContent(n), this.show(t))
                    }
                }, onItemhover: function (t) {
                    this._changePositon(t)
                }, onMouseleave: function () {
                    this.hide()
                }, onDomMouseleave: function () {
                    this.hide()
                }, show: function (t) {
                    var e = this.tooltipDOM,
                        n = this.graph,
                        i = this.timer;
                    clearTimeout(i), i = setTimeout(function () {
                        e.show(), n.fire("tooltipshow", t)
                    }, r.toolTipTimeout), this.timer = i
                }, hide: function () {
                    var t = this.tooltipDOM,
                        e = this.timer;
                    clearTimeout(e), t.hide()
                }, destroy: function () {
                    var t = this.graph,
                        e = this.custom,
                        n = this.tooltipDOM;
                    !e && n.destroy(), t.off("itemhover", i.getWrapBehavior(this, "onItemhover")), t.off("mouseleave", i.getWrapBehavior(this, "onMouseleave"))
                }
            }), t.exports = o
        },
        function (t, e, n) {
            "use strict";
            var i = n(10).G,
                r = n(3),
                o = i.Group,
                a = function t(e) {
                    t.superclass.constructor.call(this, e)
                };
            r.extend(a, o), r.augment(a, {
                drawInner: function (t) {
                    var e = this;
                    this.traverseChildren(function (t) {
                        var n = t.get("freezePoint"),
                            i = e.getMatrix().elements[0];
                        t.isShape && n && t.get("visible") && (t.initTransform(), t.transform([
                            ["t", -n.x, -n.y],
                            ["s", 1 / i, 1 / i],
                            ["t", n.x, n.y]
                        ]))
                    }), a.superclass.drawInner.call(this, t)
                }
            }), t.exports = a
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                var n = t.get("children");
                o.each(n, function (n) {
                    e(n, t), n.get("children") && i(n, e)
                })
            }
            var r = n(10),
                o = n(3),
                a = n(28),
                s = r.G,
                u = function () {};
            o.augment(u, {
                traverseChildren: function (t) {
                    i(this, t)
                }, radixSort: function () {
                    var t = this.get("children");
                    this.set("children", o.radixSort(t, function (t) {
                        return t.get("zIndex")
                    }))
                }, clear: function (t) {
                    var e = this.get("children");
                    for (t = t !== !1; 0 !== e.length;) e[e.length - 1].remove(t);
                    return this
                }, findByCFG: function (t, e) {
                    var n = this.get("children"),
                        i = [];
                    return o.each(n, function (n) {
                        n.get(t) === e && i.push(n)
                    }), i
                }
            }), o.mixin(s.Group, [u, a]), t.exports = u
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                var n = e.elements,
                    i = n[0] * t.x + n[3] * t.y + n[6],
                    r = n[1] * t.x + n[4] * t.y + n[7];
                return t.x = i, t.y = r, t
            }

            function r(t) {
                var e = t.fill,
                    n = t.fillOpacity,
                    i = new a(e);
                return t.stroke && (t.border = "" + t.lineWidth + "px solid " + t.stroke), e && n ? void(t["background-color"] = "rgba(" + 255 * i.getR() + ", " + 255 * i.getG() + ", " + 255 * i.getB() + ", " + n + ")") : void(e && (t.fill = e))
            }
            var o = n(10),
                a = n(16),
                s = n(45),
                u = n(3),
                c = o.G,
                h = function t(e) {
                    t.superclass.constructor.call(this, e)
                };
            h.ATTRS = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                fillOpacity: 1,
                lineWidth: 1
            }, u.extend(h, c.Shape), u.augment(h, {
                canFill: !0,
                type: "html",
                __isPointInFill: function (t, e) {
                    var n = this.getBBox(),
                        i = n.minX,
                        r = n.minY,
                        o = n.maxX - n.minX,
                        a = n.maxY - n.minY;
                    return i <= t && t <= i + o && r <= e && e <= r + a
                }, getDefaultAttrs: function () {
                    return h.ATTRS
                }, init: function () {
                    var t = this.get("canvas"),
                        e = this.get("attrs"),
                        n = this.get("autoSize"),
                        i = t.get("htmlElementContaniner"),
                        r = e.html,
                        o = e.cx,
                        a = e.cy,
                        s = u.createDOM(r, {
                            position: "absolute",
                            padding: "0px",
                            margin: "0px",
                            visibility: "hidden"
                        }),
                        c = void 0,
                        h = void 0;
                    i.appendChild(s), n && (c = s.width(), h = s.height(), this.attr("x", o - c / 2), this.attr("y", a - h / 2), this.attr("width", c), this.attr("height", h)), this.set("dom", s)
                }, attr: function (t, e) {
                    var n = this.get("attrs");
                    return u.isObject(t) ? (u.mix(n, t), r(n), void 0 === t.x && void 0 === t.y && void 0 === t.width && void 0 === t.height || this.calculateBox(), n) : u.isNull(e) ? n[t] : (n[t] = e, r(n), "x" !== t && "y" !== t && "width" !== t && "height" !== t || this.calculateBox(), this)
                }, calculateBox: function () {
                    var t = this.attr("x"),
                        e = this.attr("y"),
                        n = this.attr("width"),
                        i = this.attr("height"),
                        r = this.attr("lineWidth");
                    return {
                        minX: t - r / 2,
                        minY: e - r / 2,
                        maxX: t + n + r / 2,
                        maxY: e + i + r / 2
                    }
                }, isPointInPath: function (t, e) {
                    return this.__isPointInFill(t, e)
                }, applyTransform: function () {
                    var t = this.get("dom"),
                        e = this.get("canvas"),
                        n = e.get("pixelRatio"),
                        r = this.getTotalMatrix(),
                        o = this.attr("x"),
                        a = this.attr("y"),
                        s = this.attr("width"),
                        u = this.attr("height"),
                        c = i({
                            x: o,
                            y: a
                        }, r),
                        h = i({
                            x: o + s,
                            y: a + u
                        }, r);
                    t.css({
                        left: c.x / n + "px",
                        top: c.y / n + "px",
                        width: (h.x - c.x) / n + "px",
                        height: (h.y - c.y) / n + "px"
                    })
                }, tryAdd: function () {
                    var t = this.get("canvas"),
                        e = t.get("htmlElementContaniner"),
                        n = this.get("dom");
                    n.parentNode !== e && e.appendChild(n)
                }, createPath: function () {
                    var t = this.get("dom"),
                        e = this.get("attrs");
                    this.tryAdd(), this.applyTransform(), t.css(u.mix({
                        visibility: "visible"
                    }, e))
                }, destroy: function () {
                    var t = this.get("dom");
                    t && (u.isFunction(t.g6Destroy) && t.g6Destroy(), t.destroy()), h.superclass.destroy.call(this)
                }
            }), s.Html = h, t.exports = h
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(10),
                o = n(28),
                a = r.G,
                s = function () {};
            i.augment(s, {
                getAllAttrs: function () {
                    var t = this,
                        e = t.get("attrs"),
                        n = {};
                    return i.each(e, function (e, i) {
                        n[i] = t.attr(i)
                    }), n
                }
            }), i.mixin(a.Shape, [s, o]), t.exports = s
        },
        function (t, e, n) {
            "use strict";

            function i(t, e, n) {
                var i = window.devicePixelRatio;
                return i ? i < _.minPixelRatio && (i = _.minPixelRatio) : i = 2, new o({
                    width: t,
                    height: e,
                    eventEnable: !1,
                    containerDOM: n,
                    pixelRatio: i
                })
            }
            var r = n(11),
                o = n(10),
                a = n(3),
                s = n(138),
                u = n(134),
                c = n(135),
                h = n(139),
                l = n(133),
                d = n(137),
                f = n(136),
                g = n(131),
                p = n(62),
                v = n(61),
                m = n(120),
                x = n(119),
                y = n(122),
                w = n(118),
                b = n(121),
                _ = n(7),
                M = n(60),
                S = n(123),
                A = n(26),
                P = v.Node,
                T = v.Edge,
                E = function t(e) {
                    t.superclass.constructor.call(this, e), this._init()
                };
            E.ATTRS = {
                id: null,
                container: null,
                graphContainer: null,
                width: null,
                height: 500,
                addingType: "",
                itemCache: null,
                items: [],
                nodes: [],
                edges: [],
                guides: [],
                canvas: null,
                eventStash: {},
                el: null,
                forceFit: !1,
                grid: !0,
                guide: !0,
                defaultNodeShape: null,
                animate: !1,
                drawFrameObj: {},
                useAnchor: !0,
                useEdgeSortGroup: !0,
                useNodeSortGroup: !1,
                useFreezeSizeGroup: !1,
                wheelScaleLimit: [-(1 / 0), 1 / 0],
                behaviourSignal: {},
                maxZoom: 10,
                minZoom: .1,
                domFocus: !1,
                tooltipDOM: null,
                preciseAnchor: !1,
                autoLayout: !0,
                intersectBox: "rect"
            }, a.extend(E, r), a.mixin(E, [f, d, l, g, s, u, c, h]), a.augment(E, {
                _init: function () {
                    this._pluginInit(), this.fire("beforeinit"), this._initCfg(), this._initDOM(), this._initData(), this._initMapper(), this._initEvent(), this._initForceFit(), this.get("grid") && this._initGrid(), this._initModal(), this._initEditor(), this._initMode(), this._initLayout(), this._initAnimate(), this._initGuide(), this.fire("afterinit")
                }, _initGuide: function () {
                    var t = a.mix({
                            graph: this,
                            guides: this.get("guides")
                        }, _.guide, this.get("guide")),
                        e = new b(t);
                    this.set("guideAssist", e)
                }, _initGrid: function () {
                    var t = a.mix({
                            minX: 0,
                            minY: 0,
                            maxX: this.get("width"),
                            maxY: this.get("height"),
                            group: this.get("backGroup")
                        }, _.grid, this.get("grid")),
                        e = new m(t);
                    this.set("gridAssist", e)
                }, _initAnimate: function () {
                    var t = this.get("animate"),
                        e = this.get("canvas"),
                        n = this.get("frontCanvas");
                    t && this.set("animateAssist", new w({
                        canvases: [e, n]
                    }))
                }, _initForceFit: function () {
                    this.get("width") || this.set("forceFit", !0), this.get("forceFit") && (window.addEventListener("resize", a.wrapBehavior(this, "_initForceFitEvent")), this.forceFit())
                }, _initForceFitEvent: function () {
                    var t = this,
                        e = setTimeout(function () {
                            t.forceFit()
                        }, 200);
                    clearTimeout(this.get("resizeTimer")), this.set("resizeTimer", e)
                }, _on: function (t, e) {
                    var n = this.get("eventStash");
                    n[t] || (n[t] = []), n[t].push(e), this.on(t, e)
                }, _off: function () {
                    var t = this,
                        e = this.get("eventStash");
                    a.each(e, function (n, i) {
                        a.each(n, function (e) {
                            t.off(i, e)
                        }), e[i] = []
                    })
                }, _initData: function () {
                    this.set("itemCache", {}), this.set("items", []), this.set("nodes", []), this.set("edges", [])
                }, _initMapper: function () {
                    this.set("nodeMapper", new p), this.set("edgeMapper", new p)
                }, _initDOM: function () {
                    var t = this.get("container");
                    if (!t) {
                        var e = this.get("id");
                        if (t = document.getElementById(e), !t) throw new Error("please set the id for the graph")
                    }
                    var n = this.get("useEdgeSortGroup"),
                        r = this.get("useFreezeSizeGroup"),
                        o = this.get("useNodeSortGroup"),
                        s = this.get("width"),
                        u = this.get("height"),
                        c = a.createDOM('<div class="graph-container"></div>', {
                            position: "relative"
                        });
                    t.appendChild(c);
                    var h = i(s, u, c),
                        l = c.appendChild(a.createDOM('<div class="graph-container-html-Elements"></div>')),
                        d = i(s, u, c),
                        f = d.addShape("rect", {
                            attrs: a.mix({}, _.modalRectStyle),
                            visible: !1,
                            capture: !1
                        }),
                        g = d.get("el");
                    h.set("htmlElementContaniner", l), l.style.overflow = "hidden", l.style.width = s + "px", l.style.height = u + "px", l.style.position = "absolute", l.style.top = 0, l.style.left = 0, g.style.position = "absolute", g.style.top = 0, g.style.left = 0, c.style["font-family"] = _.fontFamily;
                    var p = r ? h.addGroup(S) : h.addGroup(),
                        v = d.addGroup(S),
                        m = p.addGroup(),
                        x = p.addGroup(),
                        y = n ? x.addGroup(M) : x.addGroup(),
                        w = o ? x.addGroup(M) : x.addGroup(),
                        b = p.addGroup(),
                        A = v.addGroup({
                            capture: !1
                        }),
                        P = v.addGroup(),
                        T = v.addGroup(),
                        E = v.addGroup();
                    p.set("gid", "rootGroup"), v.set("gid", "frontCanvasRootGroup"), m.set("animate", !1);
                    var C = v.addGroup(M, {
                        visible: !1
                    });
                    g.setAttribute("tabindex", 20), g.style.outline = "none", this.set("rootGroup", p), this.set("itemGroup", x), this.set("backGroup", m), this.set("frontGroup", b), this.set("frontCanvasRootGroup", v), this.set("controlPointRootGroup", E), this.set("delegaRootGroup", P), this.set("activedRectRootGroup", A), this.set("anchorPointRootGroup", T), this.set("nodeGroup", w), this.set("edgeGroup", y), this.set("canvas", h), this.set("frontCanvas", d), this.set("graphContainer", c), this.set("htmlElementContaniner", l), this.set("container", t), this.set("el", g), this.set("modalRect", f), this.set("modalGroup", C)
                }, _initEvent: function () {
                    var t = this,
                        e = new x({
                            graph: this,
                            frontCanvas: this.get("frontCanvas"),
                            canvas: this.get("canvas"),
                            rootGroup: this.get("rootGroup")
                        });
                    this.set("eventAssist", e), this.on("domfocus", function () {
                        t.set("domFocus", !0)
                    }), this.on("domblur", function () {
                        t.set("domFocus", !1)
                    })
                }, getViewPortBox: function () {
                    var t = this.get("width"),
                        e = this.get("height"),
                        n = this.invertPoint({
                            x: 0,
                            y: 0
                        }),
                        i = this.invertPoint({
                            x: t,
                            y: e
                        });
                    return {
                        minX: n.x,
                        minY: n.y,
                        maxX: i.x,
                        maxY: i.y
                    }
                }, _updateGrid: function () {
                    var t = this.get("gridAssist");
                    if (t) {
                        var e = this.getViewPortBox();
                        t.update(e)
                    }
                }, _afterAddItem: function (t, e) {
                    var n = this.get("itemCache");
                    this.fire("itemadd", {
                        item: e,
                        model: e.get("model")
                    }), this.fire("itemchange", {
                        item: e
                    }), n[t] = e
                }, _clearInner: function () {
                    var t = this.get("guideAssist"),
                        e = this.get("itemCache"),
                        n = this.get("animate"),
                        i = this.get("htmlElementContaniner");
                    i.innerHTML = "", a.each(e, function (t) {
                        t.destroy()
                    }), t.clear(!n), this.fire("afterclear")
                }, _updateEdgeEnd: function (t, e, n) {
                    var i = this,
                        r = i.get("itemCache"),
                        o = e[n],
                        a = t.get(n);
                    if (!a || a.get("id") !== o) {
                        a && a.removeEdge(t);
                        var s = r[o];
                        s.addEdge(t), t.set(n, s)
                    }
                }, _drawInner: function () {
                    this._drawItems(), this._doLayout(), this._drawGuides(), this.fire("afterdrawinner")
                }, getBBox: function () {
                    var t = this.get("itemGroup");
                    return t.getBBox()
                }, _drawItems: function () {
                    var t = this.get("nodes"),
                        e = this.get("edges");
                    this._addNodes(t), this._addEdges(e)
                }, _drawGuides: function () {
                    var t = this.get("guideAssist");
                    t.draw()
                }, _readGuides: function (t) {
                    var e = this;
                    a.each(t, function (t) {
                        e.get("guides").push(t)
                    })
                }, _saveGuides: function () {
                    var t = this.get("guideAssist");
                    return t.save()
                }, _getAllActived: function () {
                    var t = this.getAllActived();
                    return t.sort(function (t, e) {
                        var n = t.get("group"),
                            i = e.get("group"),
                            r = void 0,
                            o = void 0;
                        return n && (r = n.get("parent"), o = r.get("children")), o.indexOf(n) - o.indexOf(i)
                    }), t
                }, addItem: function (t, e) {
                    t = a.ucfirst(t);
                    var n = "_add" + t + "s",
                        i = this[n]([e])[0];
                    return i
                }, removeItem: function (t) {
                    var e = this,
                        n = e.get("itemCache");
                    if (t && !t.destroyed) {
                        a.isString(t) && (t = n[t]);
                        var i = t.get("id");
                        if (this.fire("itemremove", {
                            item: t
                        }), "node" === t.get("type")) {
                            var r = t.get("edges").slice();
                            a.each(r, function (t) {
                                t && !t.destroyed && e.removeItem(t)
                            })
                        }
                        this.fire("itemchange", {
                            item: t
                        }), t.destroy(), delete n[i]
                    }
                }, updateItem: function (t, e) {
                    var n = this.get("itemCache");
                    a.isString(t) && (t = n[t]);
                    var i = t.get("type"),
                        r = t.get("model");
                    if (a.mix(r, e), "edge" === i) this._updateEdgeEnd(t, r, "source"), this._updateEdgeEnd(t, r, "target"), t.update();
                    else if ("node" === i) {
                        t.update();
                        var o = t.get("edges");
                        a.each(o, function (t) {
                            t.update()
                        })
                    }
                    return this.fire("itemupdate", {
                        item: t,
                        model: e
                    }), this.fire("itemchange", {
                        item: t
                    }), t
                }, css: function (t) {
                    var e = this.get("el");
                    a.each(t, function (t, n) {
                        e.style[n] = t
                    })
                }, _addNodes: function (t) {
                    var e = this,
                        n = e.get("nodeGroup"),
                        i = e.get("itemCache"),
                        r = e.get("animate"),
                        o = e.get("intersectBox"),
                        s = [];
                    return a.each(t, function (t) {
                        var u = t.id;
                        if (a.isNull(u) && (u = a.guid(), t.id = u), i[u]) throw new Error("id: " + u + " \u5df2\u5b58\u5728\uff01id: " + u + " already exist!");
                        var c = n.addGroup(A, {
                                id: u,
                                type: "node"
                            }),
                            h = new P({
                                id: u,
                                graph: e,
                                group: c,
                                animate: r,
                                model: t,
                                intersectBox: o,
                                mapper: e.get("nodeMapper"),
                                delegaRootGroup: e.get("delegaRootGroup"),
                                useAnchor: e.get("useAnchor"),
                                controlPointRootGroup: e.get("controlPointRootGroup"),
                                activedRectRootGroup: e.get("activedRectRootGroup"),
                                anchorPointRootGroup: e.get("anchorPointRootGroup")
                            });
                        e._afterAddItem(u, h), s.push(h), h.draw(), e.get("items").push(h)
                    }), s
                }, read: function (t) {
                    var e = this;
                    a.each(t, function (t, n) {
                        e["_read" + a.ucfirst(n)](t)
                    })
                }, save: function () {
                    return {
                        source: this._saveSource(),
                        guides: this._saveGuides()
                    }
                }, _addEdges: function (t) {
                    var e = this,
                        n = e.get("animate"),
                        i = e.get("itemCache"),
                        r = e.get("edgeGroup"),
                        o = [];
                    return a.each(t, function (t) {
                        var s = t.id,
                            u = i[t.source],
                            c = i[t.target];
                        if (!u || !c) throw new Error("can not find effective node in edge model");
                        if (i[s]) throw new Error("id: " + s + " \u5df2\u5b58\u5728\uff01id: " + s + " already exist!");
                        a.isNull(s) && (s = a.guid(), t.id = s);
                        var h = r.addGroup(A, {
                                id: s,
                                type: "edge"
                            }),
                            l = new T({
                                id: s,
                                graph: e,
                                animate: n,
                                source: u,
                                target: c,
                                model: t,
                                group: h,
                                mapper: e.get("edgeMapper"),
                                useAnchor: e.get("useAnchor"),
                                delegaRootGroup: e.get("delegaRootGroup"),
                                controlPointRootGroup: e.get("controlPointRootGroup")
                            });
                        l.draw(), e._afterAddItem(s, l), o.push(l), e.get("items").push(l)
                    }), o
                }, invertPoint: function (t) {
                    var e = this.get("rootGroup").getMatrix();
                    return a.invertPoint(t, e)
                }, converPoint: function (t) {
                    var e = this.get("rootGroup").getMatrix();
                    return a.converPoint(t, e)
                }, forceFit: function () {
                    var t = this.get("container"),
                        e = a.getDOMWidth(t),
                        n = this.get("height");
                    e !== this.get("width") && this.changeSize(e, n)
                }, tooltip: function t(e) {
                    var n = this.get("tooltipAssist"),
                        t = {
                            graph: this,
                            tooltipDOM: this.get("tooltipDOM")
                        };
                    return e ? (a.isObject(n) && n.destroy(), a.isObject(e) && a.mix(t, e), n = new y(t), this.set("tooltipAssist", n)) : (n && n.destroy(), this.set("tooltipAssist", null)), this
                }, getItem: function (t) {
                    if (!t) return null;
                    var e = t.get("parent"),
                        n = this.get("itemCache"),
                        i = e.get("id");
                    return n[i]
                }, updateMatrix: function (t) {
                    var e = this.get("rootGroup"),
                        n = this.get("frontCanvasRootGroup"),
                        i = this.get("minZoom"),
                        r = this.get("maxZoom");
                    t.elements[0] < i || t.elements[0] > r || (e.setMatrix(t), n.setMatrix(t.clone()), this._updateGrid(), this.fire("matrixupdate", {
                        matrix: t
                    }))
                }, getScale: function () {
                    return this.getMatrix().elements[0]
                }, getMatrix: function () {
                    var t = this.get("rootGroup");
                    return t.getMatrix()
                }, toFront: function (t) {
                    var e = t.get("group"),
                        n = e.get("parent"),
                        i = n.get("children");
                    return a.remove(i, e), i.push(e), self
                }, toBack: function (t) {
                    var e = t.get("group"),
                        n = e.get("parent"),
                        i = n.get("children");
                    return a.remove(i, e), i.unshift(e), self
                }, guide: function () {
                    var t = this.get("guideAssist");
                    return t
                }, node: function () {
                    return this.get("nodeMapper")
                }, edge: function () {
                    return this.get("edgeMapper")
                }, clear: function () {
                    this._clearInner(), this._initMapper(), this._initData()
                }, draw: function (t) {
                    var e = this,
                        n = e.get("animateAssist"),
                        i = e.get("drawFrameObj");
                    i.callback = function () {
                        e.destroyed || (n ? t !== !1 ? n.run() : (n.init(), e.refresh(!1)) : e.refresh(!1))
                    }, a.frameDraw(i)
                }, refreshFront: function () {
                    this.get("frontCanvas").draw()
                }, refresh: function () {
                    this.get("canvas").draw(), this.get("frontCanvas").draw()
                }, updateNodesPosition: function () {
                    var t = this.getEdges(),
                        e = this.getNodes();
                    a.each(e, function (t) {
                        t.updatePosition()
                    }), a.each(t, function (t) {
                        t.update()
                    }), this.draw()
                }, render: function () {
                    this.fire("beforerender"), this._drawInner(), this._fitView(), this.draw(), this.fire("afterrender")
                }, changeData: function () {
                    var t = a.toArray(arguments);
                    this._clearInner(), this._initData(), this.source.apply(this, t), this._drawInner(), this.draw()
                }, getWidth: function () {
                    return this.get("width")
                }, getHeight: function () {
                    return this.get("height")
                }, changeSize: function (t, e) {
                    if (Math.abs(t) >= 1 / 0 || Math.abs(e) >= 1 / 0) return void console.warn("size parameter more than the maximum");
                    var n = this,
                        i = n.get("canvas"),
                        r = n.get("frontCanvas"),
                        o = n.get("htmlElementContaniner");
                    i.changeSize(t, e), r.changeSize(t, e), n.set("width", t), n.set("height", e), o.css({
                        width: t + "px",
                        height: e + "px"
                    }), n._updateGrid(), n.refresh(), n.fire("changesize", {
                        width: t,
                        height: e
                    })
                }, destroy: function () {
                    var t = this,
                        e = t.get("canvas"),
                        n = t.get("gridAssist"),
                        i = t.get("guideAssist"),
                        r = t.get("tooltipAssist"),
                        o = t.get("eventAssist"),
                        s = t.get("container"),
                        u = t.get("graphContainer");
                    this._pluginDestroy(), s && s.removeChild(u), o && o.destroy(), n && n.destroy(), r && r.destroy(), i && i.destroy(), e && e.destroy(), E.superclass.destroy.call(this), window.removeEventListener("resize", a.getWrapBehavior(this, "_initForceFitEvent"))
                }, find: function (t) {
                    var e = this,
                        n = e.get("itemCache");
                    return n[t]
                }, snapshot: function () {
                    var t = this.get("canvas"),
                        e = t.get("el");
                    return e.toDataURL("image/png")
                }, downloadImage: function (t) {
                    var e = this.snapshot(),
                        n = document.createElement("a"),
                        i = t ? t : "chart.png";
                    return n.download = i, n.href = e.replace("image/png", "image/octet-stream"), n.click(), this
                }, showAnchor: function (t) {
                    return t.showAnchor(), this.refreshFront(), this
                }, hideAnchor: function (t) {
                    return t.hideAnchor(), this.refreshFront(), this
                }, setCapture: function (t) {
                    var e = this.get("rootGroup"),
                        n = this.get("frontCanvasRootGroup");
                    e.set("capture", t), n.set("capture", t)
                }, updateAnchor: function (t, e, n) {
                    return t.updateAnchor(e, n), this.refreshFront(), this
                }, setAnchorActived: function (t) {
                    var e = t.get("hoverStyle");
                    return t.attr(e), this.refreshFront(), this
                }, setAnchorUnActived: function (t) {
                    var e = t.get("attrs");
                    return t.attr(e), this.refreshFront(), this
                }, isInGraph: function (t) {
                    var e = this.get("itemCache"),
                        n = !1;
                    return a.each(e, function (e) {
                        e === t && (n = !0)
                    }), n
                }, _initCfg: function () {}, _initEditor: function () {}, _readSource: function () {}, _saveSource: function () {}, update: function () {}, remove: function () {}, source: function () {}, add: function () {}
            }), t.exports = E
        },
        function (t, e, n) {
            "use strict";
            var i = n(3),
                r = n(27),
                o = function t(e) {
                    t.superclass.constructor.call(this, e), this._initEnds()
                };
            o.ATTRS = {
                type: "edge",
                controlPoints: [null, null],
                source: null,
                target: null,
                sourceAnchor: null,
                targetAnchor: null,
                useAnchor: !0
            }, i.extend(o, r), i.augment(o, {
                _initEnds: function () {
                    var t = this,
                        e = t.get("source"),
                        n = t.get("target");
                    e && e.addEdge(t), n && n.addEdge(t)
                }, _getEdgePoints: function () {
                    var t = this,
                        e = t.get("model"),
                        n = t.get("source"),
                        r = t.get("target"),
                        o = t.get("useAnchor"),
                        a = t.get("graph"),
                        s = t.getControlPoints(),
                        u = e.sourceAnchor,
                        c = e.targetAnchor,
                        h = n.getCenter(),
                        l = r ? r.getCenter() : n.getCenter(),
                        d = s.length,
                        f = t.getShapeCfg(),
                        g = t.get("shapeManger"),
                        p = 0,
                        v = d - 1,
                        m = a.get("preciseAnchor"),
                        x = void 0;
                    return o ? (null === u && delete e.sourceAnchor, null === c && delete e.targetAnchor, i.isNumber(u) && n && (u = n.getAnchor(u)), i.isNumber(c) && r && (c = r.getAnchor(c)), d > 2 ? (n && !u && (u = n.getAnchor(s[p + 1])), r && !c && (c = r.getAnchor(s[v - 1]))) : (x = m && g.getPath(f.shape, [h, l]), n && !u && (u = x ? n.getAnchor(x) : n.getAnchor(l)), r && !c && (c = x ? r.getAnchor(x) : r.getAnchor(h))), s[0] = {
                        x: u.x,
                        y: u.y
                    }, s[v] = {
                        x: c.x,
                        y: c.y
                    }, s) : (s[0] = {
                        x: h.x,
                        y: h.y
                    }, s[v] = {
                        x: l.x,
                        y: l.y
                    }, s)
                }, beforeDraw: function () {
                    o.superclass.beforeDraw.call(this);
                    var t = this.getShapeCfg(),
                        e = this.get("group");
                    t.points = this._getEdgePoints(), t.target = this.get("target"), t.source = this.get("source"), e.set("controlPoints", this.get("controlPoints"))
                }, getControlPoints: function () {
                    var t = this.get("model"),
                        e = t.controlPoints ? t.controlPoints : this.get("controlPoints");
                    return e
                }, addControlPoint: function (t) {
                    var e = this.getControlPoints(),
                        n = 1 / 0,
                        r = void 0,
                        o = void 0,
                        a = void 0;
                    return i.each(e, function (s, u) {
                        if (o = e[u + 1]) {
                            if (a = i.segmentDistance(s, o, t), a < 1) return r = u, !1;
                            a < n && (n = a, r = u)
                        }
                    }), e.splice(r + 1, 0, t), r
                }, getDelegationPath: function (t) {
                    var e = this,
                        n = e.getControlPoints(),
                        r = t.controlPointIndex,
                        o = n[r - 1],
                        a = n[r + 1],
                        s = [{
                            x: t.x,
                            y: t.y
                        }];
                    o && s.unshift(o), a && s.push(a);
                    var u = i.pointsToPolygon(s);
                    return u
                }, destroyItem: function () {
                    var t = this,
                        e = t.get("source");
                    e && !e.destroyed && e.removeEdge(t);
                    var n = t.get("target");
                    n && !n.destroyed && n.removeEdge(t)
                }, isExtremePoint: function (t) {
                    var e = this.getControlPoints(),
                        n = void 0;
                    return i.isObject(t) && (n = e.indexOf(t)), i.isNumber(t) && (n = t), 0 === n || n === e.length - 1
                }, isSourcePoint: function (t) {
                    var e = this.getControlPoints(),
                        n = void 0;
                    return i.isObject(t) && (n = e.indexOf(t)), i.isNumber(t) && (n = t), 0 === n
                }, isTargetPoint: function (t) {
                    var e = this.getControlPoints(),
                        n = void 0;
                    return i.isObject(t) && (n = e.indexOf(t)), i.isNumber(t) && (n = t), n === e.length - 1
                }, showAble: function () {
                    var t = this.get("source"),
                        e = this.get("target");
                    return t.isVisible() && e.isVisible()
                }, show: function () {
                    this.showAble() && this._show()
                }, hide: function () {
                    this._hide()
                }
            }), t.exports = o
        },
        function (t, e, n) {
            "use strict";
            var i = n(3),
                r = n(27),
                o = n(7),
                a = function t(e) {
                    t.superclass.constructor.call(this, e)
                };
            a.ATTRS = {
                type: "node",
                anchorPoints: null,
                edges: [],
                anchorGroup: null,
                boxStash: null,
                useAnchor: !0
            }, i.extend(a, r), i.augment(a, {
                calculateAnchorPoints: function (t) {
                    var e = this,
                        n = e.get("useAnchor");
                    if (n) {
                        var r = e.get("shapeManger"),
                            o = e.getShapeCfg(),
                            a = r.getAnchorPoints(o.shape, o, e.get("group"));
                        if (!i.isArray(a)) return a;
                        t = t ? t : e.getBBox();
                        var s = [];
                        return i.each(a, function (e) {
                            var n = i.mix({}, {
                                x: t.minX + e[0] * t.width,
                                y: t.minY + e[1] * t.height
                            }, e[2]);
                            s.push(n)
                        }), s
                    }
                }, _calculateAnchorPoints: function () {
                    var t = this.calculateAnchorPoints();
                    return this.set("anchorPoints", t), t
                }, hideBox: function () {
                    var t = this.get("activedRectGroup");
                    t && t.remove()
                }, showBox: function () {
                    var t = this.getBBox(),
                        e = this.getKeyShape(),
                        n = e.attr("lineWidth"),
                        r = this.get("activedRectRootGroup"),
                        a = this.get("activedRectGroup");
                    a && a.remove(), a = r.addGroup({
                        zIndex: o.zIndex.activedNodeRect,
                        id: this.get("id")
                    }), this.set("activedRectGroup", a), n = i.isNumber(n) ? n : 0, a.addShape("rect", {
                        attrs: i.mix({
                            x: t.x + n / 2,
                            y: t.y + n / 2,
                            width: t.width - n,
                            height: t.height - n
                        }, o.nodeActivedBoxStyle, o.nodeAcitvedBoxStyle)
                    })
                }, getAnchorPoints: function () {
                    var t = this.get("anchorPoints");
                    return t || this._calculateAnchorPoints()
                }, setActiveStatus: function (t) {
                    var e = this;
                    a.superclass.setActiveStatus.call(this, t, function () {
                        e.showBox()
                    }, function () {
                        e.hideBox()
                    })
                }, getCenter: function () {
                    var t = this.getBBox();
                    return {
                        x: t.centerX,
                        y: t.centerY
                    }
                }, getPosition: function () {
                    var t = this.get("model");
                    return {
                        x: t.x,
                        y: t.y
                    }
                }, getAnchor: function (t) {
                    var e = this.getCenter(),
                        n = this.getAnchorPoints(),
                        r = void 0;
                    if (i.isNumber(t) && i.isArray(n)) return this.getAnchorByIndex(t);
                    if (i.isObject(t) && (r = this.getIntersectionByPoint(t)), (i.isArray(t) || i.isString(t)) && (r = this.getIntersectionByPath(t)), r) {
                        if ("auto" === n) return r;
                        if (i.isArray(n)) return i.getSnapAnchor(this, r)
                    }
                    return e
                }, getIntersectionByPoint: function (t) {
                    var e = this.getBBox(),
                        n = this.get("intersectBox"),
                        r = void 0;
                    return r = "rect" === n ? i.getRectIntersect(e, t) : i.getCircleIntersect(t.x, t.y, e.centerX, e.centerY, Math.max(e.width, e.height) / 2)
                }, getRootKeyShapePath: function () {
                    var t = this.get("graph"),
                        e = this.getKeyShape(),
                        n = i.clone(e.attr("path")),
                        r = this.getGroup(),
                        o = t.get("rootGroup");
                    return n = i.pathToAbsolute(n), i.each(n, function (t) {
                        var e = void 0;
                        if ("a" === t[0] || "A" === t[0]) e = {
                            x: t[6],
                            y: t[7]
                        }, e = i.applyPoint(e, r, o), t[6] = e.x, t[7] = e.y;
                        else
                            for (var n = 1; n < t.length; n += 2) e = {
                                x: t[n],
                                y: t[n + 1]
                            }, e = i.applyPoint(e, r, o), t[n] = e.x, t[n + 1] = e.y
                    }), n
                }, getIntersectionByPath: function (t) {
                    var e = this.getRootKeyShapePath(),
                        n = i.pathIntersection(t, e)[0];
                    if (!n) {
                        var r = this.getBBox(),
                            o = i.getRectPath(r.x, r.y, r.width, r.height);
                        n = i.pathIntersection(t, o)[0]
                    }
                    return n
                }, getAnchorByIndex: function (t) {
                    var e = this.getAnchorPoints();
                    return e[t]
                }, getControlPoints: function () {
                    var t = this,
                        e = t.getBBox(),
                        n = [];
                    return n.push({
                        x: e.x,
                        y: e.y
                    }), n.push({
                        x: e.maxX,
                        y: e.y
                    }), n.push({
                        x: e.maxX,
                        y: e.maxY
                    }), n.push({
                        x: e.x,
                        y: e.maxY
                    }), n
                }, getDelegationPath: function (t) {
                    var e = this,
                        n = e.getBBox(),
                        i = t.x,
                        r = t.y,
                        o = t.size,
                        a = n.width,
                        s = n.height;
                    o && (a = o[0], s = o[1]);
                    var u = [];
                    return u.push(["M", i - a / 2, r - s / 2]), u.push(["L", i + a / 2, r - s / 2]), u.push(["L", i + a / 2, r + s / 2]), u.push(["L", i - a / 2, r + s / 2]), u.push(["Z"]), u
                }, addEdge: function (t) {
                    this.get("edges").push(t)
                }, removeEdge: function (t) {
                    i.remove(this.get("edges"), t)
                }, showAnchor: function () {
                    var t = this,
                        e = t.getAnchorPoints(),
                        n = t.get("anchorPoints"),
                        r = t.get("anchorPointRootGroup"),
                        a = t.get("anchorGroup");
                    a && a.remove(!0), a = r.addGroup({
                        zIndex: o.zIndex.anchorPoint,
                        id: t.get("id")
                    }), i.each(e, function (e, r) {
                        a.addShape("circle", {
                            class: "anchor-point",
                            item: t,
                            point: e,
                            index: r,
                            anchorPoint: n[r],
                            freezePoint: e,
                            linkable: e.linkable,
                            hoverStyle: i.mix({}, o.anchorPointHoverStyle, e.hoverStyle),
                            attrs: i.mix({
                                x: e.x,
                                y: e.y
                            }, o.anchorPointStyle, e.style)
                        })
                    }), this.set("anchorGroup", a)
                }, hideAnchor: function () {
                    var t = this.get("anchorGroup");
                    t && t.remove(!0), this.set("anchorGroup", null)
                }, updateAnchor: function (t, e) {
                    var n = this.getAnchorPoints(),
                        r = n[t];
                    r && i.mix(r, e), this.showAnchor()
                }, beforeDraw: function () {
                    a.superclass.beforeDraw.call(this);
                    var t = this.get("graph"),
                        e = this.get("group"),
                        n = this.getShapeCfg();
                    e.initTransform(), t && i.isFunction(t.beforeNodeDraw) && t.beforeNodeDraw(this), n.shape || (n.shape = t.get("defaultNodeShape")), e.translate(n.x, n.y), n.x = 0, n.y = 0
                }, afterDraw: function () {
                    var t = this.get("graph"),
                        e = this.getShapeObj();
                    t && i.isFunction(t.afterNodeDraw) && t.afterNodeDraw(this), this._calculateBBox(), e && e.class && this.set("class", e.class), this._calculateAnchorPoints(), a.superclass.afterDraw.call(this)
                }, show: function () {
                    for (var t = this.get("edges"), e = void 0, n = 0; n < t.length; n++) e = t[n], !e.isVisible() && e.showAble() && e._show();
                    this._show()
                }, hide: function () {
                    for (var t = this.get("edges"), e = void 0, n = 0; n < t.length; n++) e = t[n], e.isVisible() && e._hide();
                    this._hide()
                }, getLinkNodes: function () {
                    var t = this,
                        e = t.get("graph"),
                        n = t.get("edges"),
                        r = e.get("itemCache"),
                        o = [],
                        a = void 0,
                        s = void 0,
                        u = void 0;
                    return i.each(n, function (e) {
                        a = e.get("model"), s = r[a.target], u = r[a.source], o.indexOf(s) === -1 && s !== t && o.push(s), o.indexOf(u) === -1 && u !== t && o.push(u)
                    }), o
                }, getUnLinkNodes: function () {
                    var t = this.get("id"),
                        e = this.getLinkNodes(),
                        n = this.get("graph"),
                        r = n.get("itemCache"),
                        o = [];
                    return i.each(r, function (n) {
                        "node" === n.get("type") && e.indexOf(n) === -1 && n.get("id") !== t && o.push(n)
                    }), o
                }, getSourceItems: function () {
                    var t = this.get("id");
                    return this.getRelativeItems(function (e) {
                        var n = e.getModel();
                        return n.target === t
                    })
                }, getTargetItems: function () {
                    var t = this.get("id");
                    return this.getRelativeItems(function (e) {
                        var n = e.getModel();
                        return n.source === t
                    })
                }, getRelativeItems: function (t) {
                    var e = this,
                        n = e.get("id"),
                        r = e.get("graph"),
                        o = e.get("edges"),
                        a = r.get("itemCache"),
                        s = [],
                        u = void 0,
                        c = void 0,
                        h = void 0;
                    return t && (o = i.filter(o, t)), s = s.concat(o), i.each(o, function (t) {
                        h = t.get("model"), u = a[h.target], c = a[h.source], s.indexOf(u) === -1 && u.get("id") !== n && s.push(u), s.indexOf(c) === -1 && c.get("id") !== n && s.push(c)
                    }), s
                }, getEdges: function () {
                    return this.get("edges")
                }, getUnRelativeItems: function () {
                    var t = this.get("id"),
                        e = this.get("graph"),
                        n = e.get("itemCache"),
                        r = this.getRelativeItems(),
                        o = [];
                    return i.each(n, function (e) {
                        r.indexOf(e) === -1 && e.get("id") !== t && o.push(e)
                    }), o
                }, destroy: function (t) {
                    var e = this.get("anchorGroup"),
                        n = this.get("activedRectGroup");
                    e && e.remove(), n && n.remove(), a.superclass.destroy.call(this, t)
                }, updatePosition: function () {
                    var t = this.get("model"),
                        e = this.get("group"),
                        n = this.get("graph");
                    e.initTransform(), e.translate(t.x, t.y), this._calculateBBox(), this._calculateAnchorPoints(), n.fire("afteritemrender", {
                        item: this
                    })
                }
            }), t.exports = a
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = function (t) {
                    i.mix(this, t)
                };
            i.augment(r, {
                type: null,
                mappingType: "auto",
                dims: null,
                callback: null,
                getValue: function (t) {
                    var e = this.dims,
                        n = this.callback,
                        r = this.mappingType,
                        o = null,
                        a = null;
                    if (n)
                        if ("auto" === r) {
                            var s = [];
                            i.each(e, function (e) {
                                s.push(t[e])
                            }), o = n.apply(this, s)
                        } else o = n.call(this, t);
                    else o = e ? e : t[this.type];
                    return i.isArray(o) || (o = [o]), a = o.length > 1 ? o : o[0]
                }
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(3),
                r = function () {};
            i.augment(r, {
                isItemActived: function (t) {
                    return t.isActived()
                }, setItemActived: function (t, e) {
                    this.setItemsActived([t], e)
                }, setItemsActived: function (t, e) {
                    var n = this;
                    0 !== t.length && (e !== !1 ? i.each(t, function (t) {
                        t.setActived(), n.fire("itemactived", {
                            item: t
                        })
                    }) : i.each(t, function (t) {
                        t.clearActived(), n.fire("itemunactived", {
                            item: t
                        })
                    }), this.refresh())
                }, getActived: function () {
                    var t = this,
                        e = this.getItems(),
                        n = null;
                    return i.each(e, function (e) {
                        if (t.isItemActived(e)) return n = e, !1
                    }), n
                }, getAllActived: function () {
                    var t = this,
                        e = this.getItems(),
                        n = [];
                    return i.each(e, function (e) {
                        t.isItemActived(e) && n.push(e)
                    }), n
                }, clearAllActived: function () {
                    var t = this.getAllActived();
                    return this.setItemsActived(t, !1), this
                }
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = function () {};
            i.augment(r, {
                setActiveStatus: function () {}, isActived: function () {
                    return this.get("actived")
                }, setActived: function () {
                    this.setActiveStatus(!0), this.set("actived", !0)
                }, clearActived: function () {
                    this.setActiveStatus(!1), this.set("actived", !1)
                }
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(3),
                r = function () {};
            r.ATTRS = {
                nodeFilters: [],
                edgeFilters: []
            }, i.augment(r, {
                _addFilter: function (t, e) {
                    var n = this.get(t + "Filters");
                    n.push(e)
                }, _removeFilter: function (t, e) {
                    var n = this.get(t + "Filters");
                    this.set(t + "Filters", i.filter(n, function (t) {
                        return e !== t
                    }))
                }, _filter: function (t) {
                    var e = this,
                        n = this.get(t + "Filters"),
                        r = this.get(t + "s"),
                        o = void 0,
                        a = void 0;
                    i.each(r, function (t) {
                        o = e.find(t.id), a = !0, i.each(n, function (e) {
                            a && !e(t) && (a = !1)
                        }), a ? o.show() : o.hide()
                    }), this.fire("filter")
                }, addNodeFilter: function (t) {
                    this._addFilter("node", t)
                }, addEdgeFilter: function (t) {
                    this._addFilter("edge", t)
                }, removeNodeFilter: function (t) {
                    this._removeFilter("node", t)
                }, removeEdgeFilter: function (t) {
                    this._removeFilter("edge", t)
                }, filterNode: function () {
                    this._filter("node")
                }, filterEdge: function () {
                    this._filter("edge")
                }, filter: function (t) {
                    switch (t) {
                    case "node":
                        this.filterNode();
                        break;
                    case "edge":
                        this.filterEdge();
                        break;
                    default:
                        this.filterNode(), this.filterEdge()
                    }
                    this.draw(!1)
                }
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(4),
                o = n(7),
                a = r.Matrix3,
                s = function () {};
            s.ATTRS = {
                fitView: null,
                fitViewPadding: o.fitViewPadding
            }, i.augment(s, {
                _fitView: function () {
                    var t = this.get("fitView"),
                        e = this.get("items");
                    i.isString(t) && e.length > 0 && this[t](!1), i.isObject(t) && this.focusPoint(t, !1)
                }, _zoom: function (t, e, n) {
                    var i = new a,
                        r = this.get("width"),
                        o = this.get("height"),
                        s = this.get("minZoom"),
                        u = this.getBBox(),
                        c = (u.maxX + u.minX) / 2,
                        h = (u.maxY + u.minY) / 2,
                        l = this.get("fitViewPadding"),
                        d = c,
                        f = h,
                        g = u.maxX - u.minX + 2 * l,
                        p = u.maxY - u.minY + 2 * l;
                    n && (d = n.x, f = n.y), e && (r = g, o = p, this.changeSize(g, p)), t || (t = r / g, r / g > o / p && (t = o / p)), (!t || t < s) && (t = s), i.translate(-d, -f), i.scale(t, t), i.translate(r / 2, o / 2), this.updateMatrix(i)
                }, zoomAt: function (t, e, n) {
                    var i = new a;
                    i.translate(-t, -e), i.scale(n, n), i.translate(t, e), this.updateMatrix(i), this.draw()
                }, zoom: function (t, e) {
                    this._zoom(t), e !== !1 && this.draw()
                }, autoZoom: function (t) {
                    this._zoom(), t !== !1 && this.draw()
                }, resetZoom: function (t) {
                    var e = new a;
                    this.updateMatrix(e), t !== !1 && this.draw()
                }, autoSize: function (t) {
                    this._zoom(void 0, !0), t !== !1 && this.draw()
                }, tl: function () {
                    var t = this.getBBox(),
                        e = new a,
                        n = this.get("fitViewPadding");
                    e.translate(-t.minX + n, -t.minY + n), this.updateMatrix(e)
                }, lc: function () {
                    var t = this.getBBox(),
                        e = new a,
                        n = this.get("fitViewPadding"),
                        i = this.get("height");
                    e.translate(-t.minX + n, -t.minY + i / 2 - t.height / 2), this.updateMatrix(e)
                }, bl: function () {
                    var t = this.getBBox(),
                        e = new a,
                        n = this.get("fitViewPadding"),
                        i = this.get("height");
                    e.translate(-t.minX + n, -t.minY + i - t.height - n), this.updateMatrix(e)
                }, cc: function () {
                    var t = this.getBBox(),
                        e = new a,
                        n = this.get("height"),
                        i = this.get("width");
                    e.translate(-t.minX + (i - t.width) / 2, -t.minY + (n - t.height) / 2), this.updateMatrix(e)
                }, tc: function () {
                    var t = this.getBBox(),
                        e = new a,
                        n = this.get("width"),
                        i = this.get("fitViewPadding");
                    e.translate(-t.minX + (n - t.width) / 2, -t.minY + i), this.updateMatrix(e)
                }, tr: function () {
                    var t = this.getBBox(),
                        e = new a,
                        n = this.get("width"),
                        i = this.get("fitViewPadding");
                    e.translate(-t.minX + n - t.width - i, -t.minY + i), this.updateMatrix(e)
                }, rc: function () {
                    var t = this.getBBox(),
                        e = new a,
                        n = this.get("height"),
                        i = this.get("width"),
                        r = this.get("fitViewPadding");
                    e.translate(-t.minX + i - t.width - r, -t.minY + (n - t.height) / 2), this.updateMatrix(e)
                }, br: function () {
                    var t = this.getBBox(),
                        e = new a,
                        n = this.get("height"),
                        i = this.get("width"),
                        r = this.get("fitViewPadding");
                    e.translate(-t.minX + i - t.width - r, -t.minY + n - t.height - r), this.updateMatrix(e)
                }, bc: function () {
                    var t = this.getBBox(),
                        e = new a,
                        n = this.get("height"),
                        i = this.get("width"),
                        r = this.get("fitViewPadding");
                    e.translate(-t.minX + (i - t.width) / 2, -t.minY + n - t.height - r), this.updateMatrix(e)
                }, focusPoint: function (t, e) {
                    this._zoom(1, void 0, t), e !== !1 && this.draw()
                }
            }), t.exports = s
        },
        function (t, e, n) {
            "use strict";
            var i = n(3),
                r = function () {};
            i.augment(r, {
                isNode: i.isNode,
                isEdge: i.isEdge,
                getItemsBy: function (t) {
                    var e = this.get("itemCache"),
                        n = [];
                    return i.each(e, function (e) {
                        t(e) && n.push(e)
                    }), n
                }, getNodes: function (t) {
                    if (t) {
                        var e = [];
                        return this.getItemsBy(function (n) {
                            i.isNode(n) && e.push(t(n))
                        }), e
                    }
                    return this.getItemsBy(function (t) {
                        return i.isNode(t)
                    })
                }, getEdges: function (t) {
                    if (t) {
                        var e = [];
                        return this.getItemsBy(function (n) {
                            i.isEdge(n) && e.push(t(n))
                        }), e
                    }
                    return this.getItemsBy(function (t) {
                        return i.isEdge(t)
                    })
                }, getItems: function () {
                    var t = this.get("itemCache");
                    return i.objectToValues(t)
                }
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = function () {};
            r.ATTRS = {
                layoutFn: null,
                layoutCfg: null,
                layout: null
            }, i.augment(r, {
                _initLayout: function () {
                    var t = this,
                        e = this.get("layoutFn"),
                        n = this.get("layoutCfg"),
                        i = this.get("layout");
                    !i && e && n && (i = new e(n), this.set("layout", i)), i && this.on("afteritemrender", function (e) {
                        t.isNode(e.item) ? t.setNodeSize(e.item) : t.setEdgeSize(e.item)
                    })
                }, layout: function () {}, setNodeSize: function (t) {
                    var e = t.getBBox(),
                        n = t.getModel();
                    n.width = e.width, n.height = e.height
                }, setEdgeSize: function (t) {
                    var e = t.getKeyShape(),
                        n = t.getModel();
                    i.isNumber(n.lineWidth) || (n.lineWidth = e.attr("lineWidth"))
                }, _doLayout: function () {
                    var t = this.get("layout"),
                        e = this.get("autoLayout");
                    t && e && this.layout()
                }, changeLayout: function () {}
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = function () {};
            r.ATTRS = {
                modalItems: []
            }, i.augment(r, {
                _initModal: function () {}, _updateModalRect: function () {
                    var t = this.get("modalRect"),
                        e = this.get("width"),
                        n = this.get("height");
                    t.attr({
                        x: 0,
                        y: 0,
                        width: e,
                        height: n
                    })
                }, showModal: function () {
                    var t = this.get("modalGroup"),
                        e = this.get("modalRect");
                    this._updateModalRect(), t.show(), e.show(), this.draw()
                }, hideModal: function () {
                    var t = this.get("modalGroup"),
                        e = this.get("modalRect");
                    t.hide(), e.hide(), this.draw()
                }, modal: function (t) {
                    var e = this.get("modalGroup");
                    i.each(t, function (t) {
                        var n = t.getGroup(),
                            i = n.getParent();
                        n.set("originParent", i), e.add(n)
                    }), this.showModal(), this.set("modalItems", t)
                }, unModal: function () {
                    var t = this.get("modalItems");
                    i.each(t, function (t) {
                        var e = t.getGroup(),
                            n = e.get("originParent");
                        n.add(e)
                    }), this.set("modalItems", []), this.hideModal()
                }
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                var n = void 0,
                    i = void 0;
                for (n = 0; n < t.length; n++)
                    for (i = 0; i < e.length; i++) t[n] === e[i] && t.splice(n, 1);
                for (n = 0; n < e.length; n++) t.push(e[n]);
                return t
            }

            function r(t, e) {
                for (var n = 0; n < t.length; n++)
                    if (t[n] === e) {
                        t.splice(n, 1);
                        break
                    }
            }
            var o = n(1),
                a = n(2),
                s = function () {};
            s.ATTRS = {
                modes: null,
                mode: "default",
                behaviourFilter: null,
                behaviours: null
            }, o.augment(s, {
                _initMode: function () {
                    var t = this.get("modes"),
                        e = this.get("mode");
                    t || (t = this.constructor.Mode, this.set("modes", t)), this.changeMode(e)
                }, _filterBehaviour: function (t) {
                    var e = this.get("behaviourFilter"),
                        n = {};
                    return o.each(t, function (t, i) {
                        n[i] = o.filter(t, function (t) {
                            return e.indexOf(t) === -1
                        })
                    }), n
                }, _mapCursor: function (t) {
                    var e = {
                            add: "pointer",
                            drag: "move",
                            default: "default",
                            edit: "default"
                        },
                        n = e[t];
                    n && this.css({
                        cursor: e[t]
                    })
                }, filterBehaviour: function (t) {
                    this.set("behaviourFilter", t), this.resetMode()
                }, addBehaviour: function (t, e) {
                    var n = this.get("modes");
                    return o.isArray(t) ? o.each(n, function (e, r) {
                        n[r] = i(e, t)
                    }) : n[t] ? n[t] = i(n[t], e) : n[t] = e, this.resetMode(), this
                }, removeBehaviour: function (t, e) {
                    var n = this.get("modes");
                    return o.isArray(t) ? o.each(n, function (e) {
                        o.each(t, function (t) {
                            r(e, t)
                        })
                    }) : n[t] && o.each(e, function (e) {
                        r(n[t], e)
                    }), this.resetMode(), this
                }, resetMode: function () {
                    var t = this.get("mode");
                    this.changeMode(t)
                }, changeMode: function (t) {
                    var e = this.get("modes"),
                        n = this.get("behaviourFilter");
                    e && "none" !== e && (n && (e = this._filterBehaviour(e)), e[t] && (a.resetMode(e[t], this), this.set("mode", t), this._mapCursor(t)))
                }
            }), t.exports = s
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = function () {};
            r.ATTRS = {
                plugins: null
            }, i.augment(r, {
                _pluginInit: function () {
                    var t = this,
                        e = this.get("plugins");
                    i.each(e, function (e) {
                        e.set("graph", t), e.init()
                    })
                }, _pluginDestroy: function () {
                    var t = this.get("plugins");
                    i.each(t, function (t) {
                        t.destroy()
                    })
                }
            }), t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(3),
                r = n(29);
            r.registGeom("edge", {
                defaultShapeType: "line",
                getPath: function (t, e) {
                    var n = this.getShape(t);
                    return !!i.isFunction(n.getPath) && n.getPath(e)
                }
            }), r.registEdge("polyLineFlow", {
                getPath: function (t) {
                    return i.getEdgePath("polyLineFlow", t, "line")
                }, draw: function (t, e) {
                    return i.drawEdge("polyLineFlow", t, e, !0, "line")
                }
            }), r.registEdge("line", {
                getPath: function (t) {
                    return i.getEdgePath("line", t, "line")
                }, draw: function (t, e) {
                    return i.drawEdge("line", t, e, !1, "line")
                }
            }), r.registEdge("arrow", {
                getPath: function (t) {
                    return i.getEdgePath("line", t, "line")
                }, draw: function (t, e) {
                    return i.drawEdge("line", t, e, !0, "line")
                }
            }), r.registEdge("HV", {
                getPath: function (t) {
                    return i.getEdgePath("HV", t, "line")
                }, draw: function (t, e) {
                    return i.drawEdge("HV", t, e, !1, "line", !1)
                }
            }), r.registEdge("VH", {
                getPath: function (t) {
                    return i.getEdgePath("VH", t, "line")
                }, draw: function (t, e) {
                    return i.drawEdge("VH", t, e, !1, "line", !1)
                }
            }), r.registEdge("HVH", {
                getPath: function (t) {
                    return i.getEdgePath("HVH", t, "line")
                }, draw: function (t, e) {
                    return i.drawEdge("HVH", t, e, !1, "line", !1)
                }
            }), r.registEdge("VHV", {
                getPath: function (t) {
                    return i.getEdgePath("VHV", t, "line")
                }, draw: function (t, e) {
                    return i.drawEdge("VHV", t, e, !1, "line", !1)
                }
            }), r.registEdge("smooth", {
                getPath: function (t) {
                    return i.getEdgePath("bezierAuto", t, "curve")
                }, draw: function (t, e) {
                    return i.drawEdge("bezierAuto", t, e, !1, "curve")
                }
            }), r.registEdge("smoothArrow", {
                getPath: function (t) {
                    return i.getEdgePath("bezierAuto", t, "curve")
                }, draw: function (t, e) {
                    return i.drawEdge("bezierAuto", t, e, !0, "curve")
                }
            }), r.registEdge("bezierHorizontal", {
                getPath: function (t) {
                    return i.getEdgePath("bezierHorizontal", t, "curve")
                }, draw: function (t, e) {
                    return i.drawEdge("bezierHorizontal", t, e, !1, "curve")
                }
            }), r.registEdge("bezierVertical", {
                getPath: function (t) {
                    return i.getEdgePath("bezierVertical", t, "curve")
                }, draw: function (t, e) {
                    return i.drawEdge("bezierVertical", t, e, !1, "curve")
                }
            }), r.registEdge("bezierQuadratic", {
                getPath: function (t) {
                    return i.getEdgePath("bezierQuadratic", t, "curve")
                }, draw: function (t, e) {
                    return i.drawEdge("bezierQuadratic", t, e, !1, "curve", !1)
                }
            })
        },
        function (t, e, n) {
            "use strict";

            function i() {
                return [
                    [.5, 0],
                    [1, .5],
                    [.5, 1],
                    [0, .5]
                ]
            }
            var r = n(3),
                o = n(29),
                a = .5 / Math.sqrt(2);
            o.registGeom("node", {
                defaultShapeType: "rect",
                getAnchorPoints: function (t, e, n) {
                    var i = this.getShape(t);
                    return !!r.isFunction(i.getAnchorPoints) && i.getAnchorPoints(e, n)
                }
            }), o.registNode("rect", {
                draw: function (t, e) {
                    return r.drawNode("rect", t, e)
                }, getAnchorPoints: i
            }), o.registNode("rhombus", {
                draw: function (t, e) {
                    return r.drawNode("rhombus", t, e)
                }, getAnchorPoints: i
            }), o.registNode("text", {
                draw: function (t, e) {
                    return r.drawNode("text", t, e)
                }, getAnchorPoints: i
            }), o.registNode("image", {
                draw: function (t, e) {
                    return r.drawNode("image", t, e)
                }, getAnchorPoints: i
            }), o.registNode("html", {
                getHtml: function (t) {
                    return t.origin.html
                }, cssSize: !1,
                draw: function (t, e) {
                    var n = r.createDOM('<div class="g6-html-node-container"></div>'),
                        i = this.getHtml(t, e);
                    return i = i ? r.createDOM(i) : r.createDOM("<div></div>"), n.appendChild(i), t.html = n, this.cssSize && (t.size = "auto"), r.drawNode("html", t, e)
                }, getAnchorPoints: function () {
                    return [
                        [0, .25],
                        [0, .5],
                        [0, .75],
                        [1, .25],
                        [1, .5],
                        [1, .75],
                        [.25, 0],
                        [.5, 0],
                        [.75, 0],
                        [.25, 1],
                        [.5, 1],
                        [.75, 1]
                    ]
                }
            }), o.registNode("circle", {
                draw: function (t, e) {
                    return r.drawNode("circle", t, e)
                }, getAnchorPoints: function () {
                    return [
                        [.5 - a, .5 - a],
                        [.5, 0],
                        [.5 + a, .5 - a],
                        [1, .5],
                        [.5 + a, .5 + a],
                        [.5, 1],
                        [.5 - a, .5 + a],
                        [0, .5]
                    ]
                }
            })
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = {
                    getDOMHeight: function (t) {
                        var e = i.getStyle(t, "height");
                        return parseFloat(e)
                    }, getDOMWidth: function (t) {
                        var e = i.getStyle(t, "width");
                        return parseFloat(e)
                    }, getOuterHeight: function (t) {
                        var e = i.getHeight(t),
                            n = parseFloat(i.getStyle(t, "borderTopWidth")) || 0,
                            r = parseFloat(i.getStyle(t, "paddingTop")),
                            o = parseFloat(i.getStyle(t, "paddingBottom")),
                            a = parseFloat(i.getStyle(t, "borderBottomWidth")) || 0;
                        return e + n + a + r + o
                    }, getOuterWidth: function (t) {
                        var e = i.getWidth(t),
                            n = parseFloat(i.getStyle(t, "borderLeftWidth")) || 0,
                            r = parseFloat(i.getStyle(t, "paddingLeft")),
                            o = parseFloat(i.getStyle(t, "paddingRight")),
                            a = parseFloat(i.getStyle(t, "borderRightWidth")) || 0;
                        return e + n + r + o + a
                    }, createDOM: function (t, e) {
                        var n = void 0;
                        return n = i.isString(t) ? i.createDom(t) : t, n.bbox = n.getBoundingClientRect(), n.hide = function () {
                            return n.style.visibility = "hidden", n
                        }, n.show = function () {
                            return n.style.visibility = "visible", n
                        }, n.css = function (t) {
                            return i.modiCSS(n, t), n
                        }, n.outerWidth = function () {
                            return r.getOuterWidth(n)
                        }, n.outerHeight = function () {
                            return r.getOuterHeight(n)
                        }, n.width = function () {
                            return r.getDOMWidth(n)
                        }, n.height = function () {
                            return r.getDOMHeight(n)
                        }, n.paddingLeft = function () {
                            return parseFloat(i.getStyle(n, "padding-left"))
                        }, n.paddingRight = function () {
                            return parseFloat(i.getStyle(n, "padding-right"))
                        }, n.paddingTop = function () {
                            return parseFloat(i.getStyle(n, "padding-top"))
                        }, n.paddingBottom = function () {
                            return parseFloat(i.getStyle(n, "padding-bottom"))
                        }, n.destroy = function () {
                            n.parentNode && n.parentNode.removeChild(n)
                        }, n.on = function (t, e) {
                            n.addEventListener(t, e)
                        }, n.off = function (t, e) {
                            n.removeEventListener(t, e)
                        }, n.attr = function (t) {
                            return n.getAttribute(t)
                        }, n.css(e), n
                    }
                };
            t.exports = r
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                return Math.abs(t.x - e.x) > Math.abs(t.y - e.y)
            }

            function r(t, e, n, r, o) {
                var a = [];
                if ("horizontal" === n) a.push({
                    x: 1 * (t.x + e.x) / 2,
                    y: t.y
                }), a.push({
                    x: 1 * (t.x + e.x) / 2,
                    y: e.y
                });
                else if ("vertical" === n) a.push({
                    x: t.x,
                    y: 1 * (t.y + e.y) / 2
                }), a.push({
                    x: e.x,
                    y: 1 * (t.y + e.y) / 2
                });
                else {
                    var s = Math.abs(e.x - t.x),
                        u = Math.abs(e.y - t.y),
                        c = t,
                        h = e;
                    r && r.getCenter && (c = r.getCenter()), o && o.getCenter && (h = o.getCenter()), i(t, c) || t === c && u < s ? a.push({
                        x: 1 * (t.x + e.x) / 2,
                        y: t.y
                    }) : a.push({
                        x: t.x,
                        y: 1 * (t.y + e.y) / 2
                    }), i(e, h) || e === h && u < s ? a.push({
                        x: 1 * (t.x + e.x) / 2,
                        y: e.y
                    }) : a.push({
                        x: e.x,
                        y: 1 * (t.y + e.y) / 2
                    })
                }
                return a
            }

            function o(t, e) {
                var n = {
                        x: (t.x + e.x) / 2,
                        y: (t.y + e.y) / 2
                    },
                    i = h.vector(e, t),
                    r = i.vertical(),
                    o = i.length();
                return r.setLength(.2 * o), [f.add(n, r)]
            }

            function a(t, e, n, i) {
                var o = t[0],
                    a = t[t.length - 1],
                    s = ["M", o.x, o.y],
                    c = r(o, a, i, e, n),
                    h = ["C"],
                    l = [s];
                return u.each(c, function (t) {
                    h.push(t.x, t.y)
                }), h.push(a.x, a.y), l.push(h), l
            }

            function s(t, e) {
                var n = 10,
                    i = void 0,
                    r = void 0,
                    o = t.getBBox(),
                    a = o.centerX,
                    s = o.centerY,
                    u = o.height,
                    c = o.width,
                    h = o.maxX,
                    l = o.maxY;
                if (e = [e.x, e.y], a === e[0] && (e[1] >= s ? (i = n + u / 2 - Math.abs(s - e[1]), r = [a, e[1] + i]) : (i = n + u / 2 - Math.abs(s - e[1]), r = [a, e[1] - i])), s === e[1] && (e[0] >= a ? (i = n + c / 2 - Math.abs(a - e[0]), r = [e[0] + i, s]) : (i = n + c / 2 - Math.abs(a - e[0]), r = [e[0] - i, s])), r) return r;
                var d = Math.abs(a - e[0]),
                    f = Math.abs(s - e[1]),
                    g = Math.sqrt(Math.pow(d, 2) + Math.pow(f, 2)),
                    p = 180 * Math.asin(f / g) / Math.PI;
                return e[0] >= a && e[0] <= h ? e[1] >= s && e[1] <= l ? p > 0 && p <= 45 ? (i = n + c / 2 - Math.abs(a - e[0]), r = [e[0] + i, e[1]]) : (i = n + u / 2 - Math.abs(s - e[1]), r = [e[0], e[1] + i]) : p > 0 && p <= 45 ? (i = n + c / 2 - Math.abs(a - e[0]), r = [e[0] + i, e[1]]) : (i = n + u / 2 - Math.abs(s - e[1]), r = [e[0], e[1] - i]) : e[1] >= s && e[1] <= l ? p > 0 && p <= 45 ? (i = n + c / 2 - Math.abs(a - e[0]), r = [e[0] - i, e[1]]) : (i = n + u / 2 - Math.abs(s - e[1]), r = [e[0], e[1] + i]) : p > 0 && p <= 45 ? (i = n + c / 2 - Math.abs(a - e[0]), r = [e[0] - i, e[1]]) : (i = n + u / 2 - Math.abs(s - e[1]), r = [e[0], e[1] - i]), r
            }
            var u = n(1),
                c = n(4),
                h = n(31),
                l = n(18),
                d = n(144),
                f = c.Vector2,
                g = {
                    polyLineFlow: function (t, e, n) {
                        var i = s(e, t[0]),
                            r = s(n, t[1]);
                        n = n.get("boxStash"), e = e.get("boxStash");
                        var o = new d({
                            source: e,
                            target: n,
                            sourcePosition: [t[0].x, t[0].y],
                            sourceHandlePosition: [i[0], i[1]],
                            targetPosition: [t[1].x, t[1].y],
                            targetHandlePosition: [r[0], r[1]]
                        });
                        return o = o.filter(function (t) {
                            return t
                        }).map(function (t) {
                            return {
                                x: t[0],
                                y: t[1]
                            }
                        }), l.pointsToPolygon(o)
                    }, bezierHorizontal: function (t, e, n) {
                        return a(t, e, n, "horizontal")
                    }, bezierVertical: function (t, e, n) {
                        return a(t, e, n, "vertical")
                    }, bezierAuto: function (t, e, n) {
                        return a(t, e, n, "auto")
                    }, bezierQuadratic: function (t) {
                        var e = t[0],
                            n = t[t.length - 1],
                            i = ["M", e.x, e.y],
                            r = o(e, n),
                            a = ["Q"],
                            s = [i];
                        return u.each(r, function (t) {
                            a.push(t.x, t.y)
                        }), a.push(n.x, n.y), s.push(a), s
                    }, line: function (t) {
                        var e = l.pointsToPolygon(t);
                        return e
                    }, HV: function (t) {
                        var e = t.length,
                            n = l.pointsToPolygon([t[0], {
                                    x: t[e - 1].x,
                                    y: t[0].y
                                },
                                t[e - 1]
                            ]);
                        return n
                    }, VH: function (t) {
                        var e = t.length,
                            n = l.pointsToPolygon([t[0], {
                                    x: t[0].x,
                                    y: t[e - 1].y
                                },
                                t[e - 1]
                            ]);
                        return n
                    }, HVH: function (t) {
                        var e = t.length,
                            n = l.pointsToPolygon([t[0], {
                                    x: (t[0].x + t[e - 1].x) / 2,
                                    y: t[0].y
                                }, {
                                    x: (t[0].x + t[e - 1].x) / 2,
                                    y: t[e - 1].y
                                },
                                t[e - 1]
                            ]);
                        return n
                    }, VHV: function (t) {
                        var e = t.length,
                            n = l.pointsToPolygon([t[0], {
                                    x: t[0].x,
                                    y: (t[0].y + t[e - 1].y) / 2
                                }, {
                                    x: t[e - 1].x,
                                    y: (t[0].y + t[e - 1].y) / 2
                                },
                                t[e - 1]
                            ]);
                        return n
                    }
                };
            t.exports = g
        },
        function (t, e, n) {
            "use strict";

            function i(t) {
                var e = this,
                    n = t.source,
                    i = t.target,
                    o = t.sourcePosition,
                    a = t.targetPosition,
                    s = t.sourceHandlePosition,
                    u = t.targetHandlePosition,
                    c = e.getMaxConflictArea(r.clone(s), r.clone(u), [n, i]),
                    h = c.minCoor,
                    l = c.maxCoor,
                    d = e.getTurnPointGroup(r.clone(s), r.clone(u), [n, i], h, l);
                return d = [o, s].concat(d).concat([u, a])
            }
            var r = n(1),
                o = 10;
            i.prototype = {
                getTurnPointGroup: function (t, e, n, i, o) {
                    function a(t) {
                        return !s.isCrossNode(t[0], t[1], n)
                    }
                    for (var s = this, u = [], c = r.clone(t), h = r.clone(e), l = [{
                        source: c,
                        target: [c[0], i.y]
                    }, {
                        source: c,
                        target: [c[0], o.y]
                    }, {
                        source: c,
                        target: [i.x, c[1]]
                    }, {
                        source: c,
                        target: [o.x, c[1]]
                    }], d = [{
                        source: h,
                        target: [h[0], i.y]
                    }, {
                        source: h,
                        target: [h[0], o.y]
                    }, {
                        source: h,
                        target: [i.x, h[1]]
                    }, {
                        source: h,
                        target: [o.x, h[1]]
                    }], f = l, g = d, p = 0; p < f.length; p++)
                        for (var v = 0; v < g.length; v++) {
                            var m = f[p],
                                x = g[v],
                                y = m.source[0],
                                w = m.source[1],
                                b = m.target[0],
                                _ = m.target[1],
                                M = x.source[0],
                                S = x.source[1],
                                A = x.target[0],
                                P = x.target[1],
                                T = (y - b) * (S - P) - (w - _) * (M - A);
                            if (T) {
                                var E = ((y * _ - w * b) * (M - A) - (y - b) * (M * P - S * A)) / T,
                                    C = ((y * _ - w * b) * (S - P) - (w - _) * (M * P - S * A)) / T,
                                    I = [E, C];
                                if (!s.isCrossNode(c, I, n) && !s.isCrossNode(I, h, n)) return [
                                    [E, C]
                                ]
                            }
                        }
                    if (!s.isCrossNode(c, h, n) && (s.isEqual(c, h, 0) || s.isEqual(c, h, 1))) return [c, h];
                    var k = 0,
                        B = 0;
                    if (r.each(n, function (t) {
                        k = Math.max(k, t.width), B = Math.max(B, t.height)
                    }), c[1] === h[1]) return [
                        [c[0], c[1] + .8 * B],
                        [h[0], h[1] + .8 * B]
                    ];
                    if (c[0] === h[0]) return [
                        [c[0] + .8 * k, c[1]],
                        [h[0] + .8 * k, h[1]]
                    ];
                    for (var F = c[0] < h[0] ? c[0] : h[0], N = c[0] > h[0] ? c[0] : h[0], O = c[1] < h[1] ? c[1] : h[1], R = c[1] > h[1] ? c[1] : h[1], z = [], D = 1 / 0, G = F; G < N; G++) {
                        var X = [G, c[1]],
                            Y = [G, h[1]],
                            j = [
                                [c, X],
                                [X, Y],
                                [Y, h]
                            ].every(a);
                        j && z.push([X, Y])
                    }
                    if (z.length) {
                        for (var L = void 0, H = 0; H < z.length; H++) {
                            var W = (F + N) / 2,
                                q = Math.min(D, Math.abs(W - z[H][0][0]));
                            q !== D && (L = z[H], D = q)
                        }
                        return L
                    }
                    for (var V = [], U = 1 / 0, Z = O; Z < R; Z++) {
                        var Q = [c[0], Z],
                            K = [h[0], Z],
                            $ = [
                                [c, Q],
                                [Q, K],
                                [K, h]
                            ].every(a);
                        $ && V.push([Q, K])
                    }
                    if (V.length) {
                        for (var J = void 0, tt = 0; tt < V.length; tt++) {
                            var et = (O + R) / 2,
                                nt = Math.min(U, Math.abs(et - V[tt][0][1]));
                            nt !== U && (J = V[tt], U = nt)
                        }
                        return J
                    }
                    var it = [c[0], o.y],
                        rt = [h[0], o.y],
                        ot = [c[0], i.y],
                        at = [h[0], i.y],
                        st = [i.x, i.y],
                        ut = [o.x, i.y],
                        ct = [i.x, o.y],
                        ht = [o.x, o.y];
                    if (u = [
                        [c, it],
                        [it, rt],
                        [rt, h]
                    ].every(a)) return [it, rt];
                    if (u = [
                        [c, ot],
                        [ot, at],
                        [at, h]
                    ].every(a)) return [ot, at];
                    var lt = [it, rt, ot, at],
                        dt = [st, ut, ct, ht],
                        ft = s.loopFind(c, h, lt, dt, a);
                    return ft ? ft : (it = [i.x, c[1]], rt = [i.x, h[1]], ot = [o.x, c[1]], at = [o.x, h[1]], (u = [
                        [c, it],
                        [it, rt],
                        [rt, h]
                    ].every(a)) ? [it, rt] : (u = [
                        [c, ot],
                        [ot, at],
                        [at, h]
                    ].every(a)) ? [ot, at] : (lt = [it, rt, ot, at], (ft = s.loopFind(c, h, lt, dt, a)) ? ft : (it = [i.x, c[1]], rt = [h[0], o.y], ot = [o.x, c[1]], at = [h[0], i.y], lt = [it, rt, ot, at], (ft = s.loopFind(c, h, lt, dt, a)) ? ft : (it = [c[0], o.y], rt = [i.x, h[1]], ot = [c[0], i.y], at = [o.x, h[1]], lt = [it, rt, ot, at], ft = s.loopFind(c, h, lt, dt, a), ft ? ft : void 0))))
                }, loopFind: function (t, e, n, i, r) {
                    for (var o = this, a = 0; a < n.length - 1; a++)
                        for (var s = 1; s < n.length; s++)
                            for (var u = 0; u < i.length; u++)
                                if ((o.isEqual(t, n[a], 0) || o.isEqual(t, n[a], 1)) && (o.isEqual(e, n[s], 0) || o.isEqual(e, n[s], 1)) && (o.isEqual(n[a], i[u], 0) || o.isEqual(n[a], i[u], 1)) && (o.isEqual(n[s], i[u], 0) || o.isEqual(n[s], i[u], 1))) {
                                    var c = [
                                        [t, n[a]],
                                        [n[a], i[u]],
                                        [i[u], n[s]],
                                        [n[s], e]
                                    ].every(r);
                                    if (c) return [n[a], i[u], n[s]]
                                }
                }, getMaxConflictArea: function (t, e, n) {
                    function i(t) {
                        return t.x - o <= r && t.x + t.width + o >= r && (r = t.x - o), t.x - o <= a && t.x + t.width + o >= a && (a = t.x + t.width + o), t.y - o <= s && t.y + t.height + o >= s && (s = t.y - o), t.y - o <= u && t.y + t.height + o >= u && (u = t.y + t.height + o), t
                    }
                    for (var r = Math.min(t[0], e[0]), a = Math.max(e[0], t[0]), s = Math.min(t[1], e[1]), u = Math.max(e[1], t[1]), c = 0; c < n.length; c++) n.map(i);
                    return {
                        minCoor: {
                            x: r,
                            y: s
                        },
                        maxCoor: {
                            x: a,
                            y: u
                        }
                    }
                }, isEqual: function (t, e, n) {
                    return Math.abs(t[n] - e[n]) <= 1
                }, isCrossNode: function (t, e, n) {
                    var i = this;
                    return i.isEqual(t, e, 0) ? n.some(function (n) {
                        return n.x <= t[0] && n.x + n.width >= t[0] && (n.y >= t[1] && n.y <= e[1] || n.y + n.height >= t[1] && n.y + n.height <= e[1] || n.y <= t[1] && n.y + n.height >= e[1] || n.y >= t[1] && n.y + n.height <= e[1])
                    }) : i.isEqual(t, e, 1) ? n.some(function (n) {
                        return n.y <= t[1] && n.y + n.height >= t[1] && (n.x >= t[0] && n.x <= e[0] || n.x + n.width >= t[0] && n.x + n.width <= e[0] || n.x <= t[0] && n.x + n.width >= e[0] || n.x >= t[0] && n.x + n.width <= e[0])
                    }) : void 0
                }
            }, t.exports = i
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                var n = {};
                return n.arrow = e, t.color && (n.stroke = t.color), t.size && (n.lineWidth = t.size), o.mix({}, l.edgeStyle, n, t.style)
            }

            function r(t, e, n) {
                if (t.label) {
                    var i = void 0,
                        r = void 0;
                    try {
                        i = n.getPoint(.5)
                    } catch (t) {}
                    if (!i) return;
                    r = o.isObject(t.label) ? o.mix({}, l.edgeLabelStyle, t.label, {
                        x: i.x,
                        y: i.y
                    }, t.labelStyle) : o.mix({}, l.edgeLabelStyle, {
                        text: t.label,
                        x: i.x,
                        y: i.y
                    }, t.labelStyle);
                    var a = u.drawLabel(e, r, l.zIndex.edgeLabel),
                        s = a.getBBox(),
                        c = s.maxX - s.minX,
                        h = s.maxY - s.minY,
                        d = c + 2 * f,
                        g = h + 2 * f;
                    e.addShape("rect", {
                        attrs: o.mix({
                            x: i.x - d / 2,
                            y: i.y - g / 2,
                            width: d,
                            height: g
                        }, l.edgeLabelRectStyle),
                        zIndex: l.zIndex.edgeLabelBackground
                    })
                }
            }
            var o = n(1),
                a = n(4),
                s = n(18),
                u = n(30),
                c = n(64),
                h = n(143),
                l = n(7),
                d = a.Vector2,
                f = 5,
                g = {
                    getEdgePath: function (t, e, n, i, r) {
                        return 2 === e.length ? h[t](e, i, r) : "curve" === n ? s.pointsToCurve(e) : s.pointsToPolygon(e)
                    }, drawEdge: function (t, e, n, o, a) {
                        var s = i(e, o),
                            u = g.getEdgePath(t, e.points, a, e.source, e.target);
                        s.path = u;
                        var c = n.addShape("path", {
                            attrs: s,
                            zIndex: l.zIndex.edge
                        });
                        return r(e, n, c), n.radixSort(), c
                    }, arrowTo: function (t, e, n, i, r, o, a) {
                        var s = new d(1, 0),
                            u = new d(o - i, a - r),
                            c = u.angleTo(s, !0);
                        return t.transform([
                            ["r", c],
                            ["t", e, n]
                        ]), t
                    }, snapPreciseAnchor: function (t, e) {
                        var n = e.getIntersectionByPath(t),
                            i = c.getSnapAnchor(e, n);
                        return i
                    }
                };
            t.exports = g
        },
        function (t, e, n) {
            "use strict";

            function i(t) {
                return u.isObject(t.label) ? u.mix({}, c.nodeLabelStyle, t.label, {
                    x: t.x,
                    y: t.y
                }) : u.mix({}, c.nodeLabelStyle, {
                    text: t.label,
                    x: t.x,
                    y: t.y
                })
            }

            function r(t, e) {
                e.attr({
                    y: e.attr("y") + t.attr("height") / 2 + f
                })
            }

            function o(t) {
                var e = t.getBBox(),
                    n = e.maxX - e.minX,
                    i = e.maxY - e.minY,
                    r = n + 2 * d[1],
                    o = i + 2 * d[0];
                return [r, o]
            }

            function a(t, e, n) {
                var r = void 0,
                    a = void 0;
                return n = n ? n : o, u.isNull(t.label) || (r = u.mix(i(t), t.labelStyle), a = l.drawLabel(e, r, c.zIndex.nodeLabel), t.size || (t.size = n(a))), t.size || (t.size = [g, g]), u.isNumber(t.size) && (t.size = [t.size, t.size]), a
            }

            function s(t, e, n) {
                var o = {
                        img: n
                    },
                    a = void 0;
                t.size || (t.size = g), o.width = u.isArray(t.size) ? t.size[0] : t.size, o.height = u.isArray(t.size) ? t.size[1] : t.size, o.x = t.x - o.width / 2, o.y = t.y - o.height / 2;
                var s = e.addShape("image", {
                    attrs: o,
                    zIndex: c.zIndex.node
                });
                if (t.label) {
                    var h = u.mix(i(t), t.labelStyle);
                    h.textBaseline = "top", a = l.drawLabel(e, h, c.zIndex.nodeLabel), r(s, a)
                }
                return s
            }
            var u = n(1),
                c = n(7),
                h = n(18),
                l = n(30),
                d = c.nodePadding,
                f = 5,
                g = 50,
                p = {
                    rect: function (t, e, n) {
                        a(t, e);
                        var i = t.size[0],
                            r = t.size[1],
                            o = t.x - i / 2,
                            s = t.y - r / 2,
                            u = void 0;
                        u = n.radius ? h.getRectPath(o, s, i, r, n.radius) : h.getRectPath(o, s, i, r);
                        var c = e.addShape("path", {
                            attrs: {
                                path: u
                            }
                        });
                        return c
                    }, circle: function (t, e) {
                        a(t, e, function (t) {
                            var e = t.getBBox(),
                                n = e.maxX - e.minX + 2 * d[1],
                                i = e.maxY - e.minY + 2 * d[0],
                                r = void 0,
                                o = void 0,
                                a = void 0,
                                s = (n + i / 2) / 2,
                                u = Math.acos(n / 2 / s);
                            return a = 2 * (Math.sin(u) * s), o = 2 * s, n < i && (r = a, a = o, o = r), [o, a]
                        });
                        var n = t.size[0],
                            i = t.size[1],
                            r = e.addShape("path", {
                                attrs: {
                                    path: h.getEllipsePath(t.x, t.y, n / 2, i / 2)
                                }
                            });
                        return r
                    }, text: function (t, e) {
                        t.labelStyle && !t.labelStyle.fill && t.color && (t.labelStyle.fill = t.color), t.color && (t.labelStyle = {
                            fill: t.color
                        }), t.size && (u.isArray(t.size) && (t.labelStyle = {
                            fontSize: Math.min(t.size[0], t.size[1])
                        }), u.isNumber(t.size) && (t.labelStyle = {
                            fontSize: t.size
                        })), t.label || 0 === t.label || (t.label = " ");
                        var n = a(t, e);
                        return n
                    }, image: function (t, e) {
                        var n = t.shape,
                            i = u.isArray(n) ? n[1] : n;
                        return s(t, e, i)
                    }, rhombus: function (t, e) {
                        a(t, e, function (t) {
                            var e = t.getBBox(),
                                n = e.maxX - e.minX + 2 * d[1],
                                i = e.maxY - e.minY + 2 * d[0],
                                r = Math.sqrt(n / 2 * i / 2),
                                o = n + r,
                                a = i + r;
                            return [o, a]
                        });
                        var n = t.x,
                            i = t.y,
                            r = t.size[0],
                            o = t.size[1],
                            s = [{
                                x: n,
                                y: i - o / 2
                            }, {
                                x: n + r / 2,
                                y: i
                            }, {
                                x: n,
                                y: i + o / 2
                            }, {
                                x: n - r / 2,
                                y: i
                            }],
                            u = e.addShape("path", {
                                attrs: {
                                    path: h.pointsToPolygon(s, !0)
                                }
                            });
                        return u
                    }, html: function (t, e, n) {
                        if ("auto" === t.size) return e.addShape("html", {
                            attrs: u.mix({
                                cx: t.x,
                                cy: t.y,
                                html: t.html
                            }, n),
                            autoSize: !0
                        });
                        t.size || (t.size = [g, g]);
                        var i = t.size[0],
                            r = t.size[1],
                            o = t.x - i / 2,
                            a = t.y - r / 2;
                        return e.addShape("html", {
                            attrs: u.mix({
                                x: o,
                                y: a,
                                width: i,
                                height: r,
                                html: t.html
                            }, n)
                        })
                    }
                };
            t.exports = p
        },
        function (t, e, n) {
            "use strict";
            var i = n(2);
            i.clickActive = function (t) {
                var e = void 0,
                    n = void 0;
                t._on("itemclick", function (i) {
                    e = i.item, n = i.shape, n.get("clickActive") !== !1 && (t.clearAllActived(), t.setItemActived(e), t.refreshFront())
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(9);
            i.clickAddNode = function (t) {
                r.addNode(t, "click")
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2);
            i.clickBlankClearActive = function (t) {
                t._on("click", function (e) {
                    e.shape || (t.clearAllActived(), t.refreshFront())
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2);
            i.clickNodeActive = function (t) {
                var e = void 0,
                    n = void 0;
                t._on("itemclick", function (i) {
                    e = i.item, n = i.shape, "node" === i.itemType && n.get("clickActive") !== !1 && (t.clearAllActived(), t.setItemActived(e), t.refreshFront())
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(3);
            i.collapse = function (t) {
                t._on("click", function (e) {
                    var n = e.shape;
                    if (n && n.hasClass("collapseButton")) {
                        var i = e.item.getModel();
                        t.fire("beforecollapse", e), t.fire("collapse", e), t.fire("aftercollapse", r.mix({}, e, {
                            id: i.id
                        })), t.css({
                            cursor: "default"
                        })
                    }
                }), t._on("collapse", function (e) {
                    var n = t.get("dataMap"),
                        i = e.item,
                        r = i.get("id");
                    n[r].isCollapsed = !0, t.clearAllActived(), t.refreshFront(), t.reRender();
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(9),
                o = n(3);
            i.dragAddEdge = function (t) {
                function e(e) {
                    var n = e.item,
                        i = t.get("addingType"),
                        r = t.get("addingModel");
                    if (t.fire("beforedragaddedge", e), n && "edge" === i && t.isNode(n) && e.cancel !== !0) return r.source = n.get("id"), r.target = n.get("id"), t.addItem("edge", r)
                }

                function n(t, e) {
                    if (e) return 1
                }

                function i(e, n) {
                    o.objectToValues(n).length > 0 ? (t.updateItem(e, n), t.updateRollback(), t.clearAllActived(), t.setItemActived(e), t.draw(!1), t.endAdd(e)) : (t.removeItem(e), t.refreshFront(), t.endAdd())
                }
                r.dragEdgeExtremePoint(t, e, n, i)
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(19);
            i.dragBlankX = function (t) {
                r(t, !0, !0, !1)
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(19);
            i.dragBlankY = function (t) {
                r(t, !0, !1)
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(3);
            i.dragEdgeEndHideAnchor = function (t) {
                t._on("dragedgeend", function (t) {
                    r.isNode(t.item) && t.item.hideAnchor()
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(9),
                o = n(3);
            i.dragEdge = function (t) {
                function e(e) {
                    var n = e.shape,
                        i = void 0;
                    if (n && n.hasClass("control-point") && (i = n.get("item"), t.isEdge(i))) return i
                }

                function n(t, e) {
                    var n = t.shape,
                        i = void 0;
                    if (e && (i = n.get("pointIndex"), e.isExtremePoint(i))) return i
                }

                function i(e, n) {
                    o.objectToValues(n).length > 0 ? (t.updateItem(e, n), t.updateRollback(), t.draw(!1)) : t.refreshFront()
                }
                r.dragEdgeExtremePoint(t, e, n, i)
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2);
            i.dragHideEdges = function (t) {
                var e = t.get("edgeGroup");
                t._on("dragstart", function () {
                    e.hide(), t.draw(!1)
                }), t._on("dragend", function () {
                    e.show(), t.draw(!1)
                }), t._on("dommouseleave", function () {
                    e.show(), t.draw(!1)
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(9);
            i.dragHideTexts = function (t) {
                t._on("dragstart", function () {
                    r.hideTexts(t)
                }), t._on("dragend", function () {
                    r.showTexts(t)
                }), t._on("dommouseleave", function () {
                    r.showTexts(t)
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2);
            i.dragNodeEndHideAnchor = function (t) {
                t._on("dragnodeend", function (t) {
                    1 === t.dragItems.length ? t.node.showAnchor() : t.node.hideAnchor()
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2);
            i.dragNodeEndSetActive = function (t) {
                t._on("dragnodeend", function (e) {
                    1 === e.dragItems.length && (t.clearAllActived(), t.setItemActived(e.dragItems[0]))
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(2),
                o = n(9);
            r.dragNode = function (t) {
                var e = t.get("gridAssist"),
                    n = e && e.forceAlign,
                    r = t.get("behaviourSignal"),
                    a = [],
                    s = null,
                    u = !1,
                    c = void 0,
                    h = void 0,
                    l = void 0,
                    d = void 0,
                    f = void 0,
                    g = void 0,
                    p = void 0;
                t._on("mousedown", function (e) {
                    l = e.shape, h = e.item, !t.isNode(h) || l && l.hasClass("control-point") || l && l.hasClass("anchor-point") || (s = {
                        x: e.x,
                        y: e.y
                    }, h.isActived() ? (c = t._getAllActived(), i.each(c, function (t) {
                        a.push(t)
                    })) : a.push(h))
                }), t._on("dragmove", function (e) {
                    i.isArray(a) && 0 !== a.length && (u = !0, r.draggingNode = !0, i.each(a, function (n) {
                        t.isNode(n) && (p = n.getBBox(), g = {
                            x: (p.x + p.maxX) / 2,
                            y: (p.y + p.maxY) / 2
                        }, n.showDelegation({
                            x: g.x + e.x - s.x,
                            y: g.y + e.y - s.y
                        }))
                    }), t.refreshFront())
                }), t._on("mouseup", function (l) {
                    i.isArray(a) && 0 !== a.length && (u && (h = l.item, a = i.filter(a, function (e) {
                        return t.isInGraph(e)
                    }), i.each(a, function (r) {
                        t.isNode(r) ? (g = r.getPosition(), d = {
                            x: g.x + l.x - s.x,
                            y: g.y + l.y - s.y
                        }, h !== r && r && !r.hasClass("preventToFront") && t.toFront(r), n && o.alignPoint(d, e.cell), r.hideDelegation()) : (f = r.getControlPoints(), d = {}, f.length > 2 && (i.each(f, function (t, i) {
                            0 !== i && i !== f.length - 1 && (t.x = t.x + l.x - s.x, t.y = t.y + l.y - s.y, n && o.alignPoint(t, e.cell))
                        }), d = {
                            controlPoints: f
                        })), t.updateItem(r, d), t.isNode(r) && t.fire("dragnodeend", {
                            dragItems: a,
                            node: r
                        })
                    }), t.updateRollback(), t.draw(!1)), s = null, h = void 0, g = void 0, f = void 0, c = void 0, d = void 0, a = [], u = !1, r.draggingNode = void 0)
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2);
            i.hoverAnchorSetActived = function (t) {
                var e = void 0;
                t._on("mouseenter", function (n) {
                    e = n.shape, e && e.hasClass("anchor-point") && t.setAnchorActived(e)
                }), t._on("mouseleave", function (n) {
                    e = n.shape, e && e.hasClass("anchor-point") && t.setAnchorUnActived(e)
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2);
            i.hoverNodeShowAnchor = function (t) {
                var e = t.get("behaviourSignal"),
                    n = void 0;
                t._on("itemmouseenter", function (i) {
                    "node" !== i.itemType || e.draggingNode || (n = setTimeout(function () {
                        !t.destroyed && t.showAnchor(i.item)
                    }, 200))
                }), t._on("itemmouseleave", function (e) {
                    "node" === e.itemType && (clearTimeout(n), !t.destroyed && t.hideAnchor(e.item))
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(9);
            i.mouseupAddNode = function (t) {
                r.addNode(t, "mouseup")
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(7),
                o = n(3);
            i.multiSelect = function (t) {
                var e = t.get("frontCanvasRootGroup"),
                    n = t.get("behaviourSignal"),
                    i = !1,
                    a = [],
                    s = void 0,
                    u = void 0,
                    c = void 0,
                    h = void 0,
                    l = void 0,
                    d = void 0,
                    f = void 0,
                    g = void 0,
                    p = void 0,
                    v = void 0,
                    m = void 0;
                t._on("mousedown", function (t) {
                    h = t.item, l = t.shape, h || d || l || (f = {
                        x: t.x,
                        y: t.y
                    }, d = e.addShape("rect", {
                        attrs: r.frameRectStyle
                    }), n.frameSelecting = !0)
                }), t._on("dragmove", function (e) {
                    d && (g = Math.min(f.x, e.x), p = Math.min(f.y, e.y), v = Math.max(f.x, e.x), m = Math.max(f.y, e.y), d.attr({
                        x: g,
                        y: p,
                        width: v - g,
                        height: m - p
                    }), t.refreshFront())
                }), t._on("mouseup", function () {
                    d && (s = t.get("itemCache"), o.each(s, function (e) {
                        "node" === e.get("type") ? (u = e.getBBox(), c = [{
                            x: u.x,
                            y: u.y
                        }, {
                            x: u.x,
                            y: u.maxY
                        }, {
                            x: u.maxX,
                            y: u.y
                        }, {
                            x: u.maxX,
                            y: u.maxY
                        }]) : c = e.getControlPoints(), o.each(c, function (n, r) {
                            if (i = o.isInRect(n, g, p, v, m), t.isNode(e)) {
                                if (i) return a.push(e), !1
                            } else {
                                if (!i) return !1;
                                r === c.length - 1 && a.push(e)
                            }
                        })
                    }), t.clearAllActived(), t.setItemsActived(a), d.remove(!0), t.refreshFront(), n.frameSelecting = void 0, h = void 0, d = void 0, f = void 0, g = void 0, p = void 0, v = void 0, m = void 0, a = [])
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(9),
                o = n(3);
            i.resizeEdge = function (t) {
                var e = t.get("gridAssist"),
                    n = e && e.forceAlign,
                    i = void 0,
                    a = void 0,
                    s = void 0,
                    u = void 0,
                    c = void 0,
                    h = void 0,
                    l = void 0,
                    d = void 0,
                    f = void 0,
                    g = void 0,
                    p = void 0,
                    v = void 0;
                t._on("click", function (e) {
                    i = e.item, a = t.getActived(), v = e.shape, !t.isEdge(i) || i !== a || v && v.hasClass("control-point") || (i.addControlPoint({
                        x: e.x,
                        y: e.y
                    }), c = i.getControlPoints(), t.updateItem(i, {
                        controlPoints: c
                    }), t.updateRollback(), t.refreshFront())
                }), t._on("mousedown", function (e) {
                    if (v = e.shape, v && v.hasClass("control-point")) {
                        if (s = v.get("item"), !t.isEdge(s)) return void(s = void 0);
                        if (g = v.get("pointIndex"), s.isExtremePoint(g)) return s = void 0, void(g = void 0);
                        u = v.get("point"), c = s.getControlPoints(), h = c[g - 1], l = c[g + 1]
                    }
                }), t._on("dragmove", function (e) {
                    t.isEdge(s) && (i = e.item, p = {
                        x: e.x,
                        y: e.y,
                        controlPointIndex: g
                    }, o.isInSegment(h, l, p) ? p.stroke = "red" : p.stroke = "blue", s.showDelegation(p), t.refreshFront())
                }), t._on("mouseup", function (m) {
                    t.isEdge(s) && (i = m.item, d = {
                        x: m.x,
                        y: m.y
                    }, f = {}, s.hideDelegation(), o.isInSegment(h, l, d) ? c.splice(g, 1) : 0 !== g && g !== c.length - 1 && (u.x = d.x, u.y = d.y, n && r.alignPoint(u, e.cell), f.controlPoints = c), t.updateItem(s, f), t.updateRollback(), t.draw(!1), i = void 0, a = void 0, s = void 0, u = void 0, c = void 0, h = void 0, l = void 0, d = void 0, f = void 0, g = void 0, p = void 0, v = void 0)
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(9);
            i.resizeNode = function (t) {
                var e = t.get("behaviourSignal"),
                    n = !1,
                    i = void 0,
                    o = void 0,
                    a = void 0,
                    s = void 0,
                    u = void 0,
                    c = void 0,
                    h = void 0;
                t._on("mousedown", function (t) {
                    i = t.shape, i && i.hasClass("control-point") && (u = i.get("item"), c = i.get("point"), h = i.get("pointIndex"))
                }), t._on("dragmove", function (i) {
                    t.isNode(u) && (n = !0, e.resizingNode = !0, o = {
                        x: i.x,
                        y: i.y
                    }, s = r.getControlInfo(o, h, c, u, "frontCanvas"), a = s.size, a[0] > 5 && a[1] > 5 && (u.showDelegation(s), t.refreshFront()))
                }), t._on("mouseup", function (l) {
                    t.isNode(u) && (n && (o = {
                        x: l.x,
                        y: l.y
                    }, s = r.getControlInfo(o, h, c, u), a = s.size, a[0] > 5 && a[1] > 0 && (t.updateItem(u, s), t.updateRollback()), u.hideDelegation(), t.draw(!1)), e.resizingNode = void 0, i = void 0, o = void 0, a = void 0, s = void 0, u = void 0, c = void 0, n = !1, h = void 0)
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2);
            i.shortcut = function (t) {
                var e = !1;
                t._on("keydown", function (n) {
                    if (32 === n.keyCode) {
                        if (e) return;
                        e = !0, "drag" === t.get("mode") ? t.changeMode("edit") : t.changeMode("drag"), e = !0
                    }
                    return n.metaKey && 67 === n.keyCode ? void t.copy() : n.metaKey && 86 === n.keyCode ? void t.paste() : n.metaKey && n.altKey && 90 === n.keyCode ? void t.redo() : n.metaKey && 90 === n.keyCode ? void t.updo() : n.ctrlKey && 67 === n.keyCode ? void t.copy() : n.ctrlKey && 86 === n.keyCode ? void t.paste() : n.ctrlKey && n.altKey && 90 === n.keyCode ? void t.redo() : n.ctrlKey && 90 === n.keyCode ? void t.updo() : 8 === n.keyCode || 46 === n.keyCode ? void t.del() : void 0
                }), t._on("keyup", function () {
                    e = !1
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(3);
            i.spreadout = function (t) {
                t._on("click", function (e) {
                    var n = e.shape;
                    if (n && n.hasClass("spreadoutButton")) {
                        var i = e.item.getModel();
                        t.fire("beforespreadout", e), t.fire("spreadout", e), t.fire("afterspreadout", r.mix({}, e, {
                            id: i.id
                        })), t.css({
                            cursor: "default"
                        })
                    }
                }), t._on("spreadout", function (e) {
                    var n = t.get("dataMap"),
                        i = e.item,
                        r = i.get("id");
                    n[r].isCollapsed = !1, t.clearAllActived(), t.refreshFront(), t.reRender()
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(9);
            i.wheelZoomAutoTexts = function (t) {
                t.on("afterdrawinner", function () {
                    r.autoTexts(t)
                }), t.on("wheelzoomend", function () {
                    r.autoTexts(t)
                }), t.on("itemmouseenter", function (e) {
                    "node" === e.itemType && (r.showText(e.item), t.draw(!1))
                }), t.on("itemmouseleave", function (e) {
                    if ("node" === e.itemType) {
                        var n = e.item.getGroup();
                        n.traverseChildren(function (t) {
                            var e = t.get("autoTextHide");
                            "text" === t.type && e !== !1 && t.hide()
                        }), t.draw(!1)
                    }
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(9);
            i.onWheelZoomEdges = function (t) {
                var e = t.get("edgeGroup");
                r.onWheelZoom(t, function () {
                    e.hide(), t.draw(!1)
                }, function () {
                    e.show(), t.draw(!1)
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(2),
                r = n(9);
            i.onWheelZoomTexts = function (t) {
                r.onWheelZoom(t, function () {
                    r.hideTexts(t)
                }, function () {
                    r.showTexts(t)
                })
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(71),
                o = function (t) {
                    i.mix(this, t), this._init()
                };
            i.extend(o, r), i.augment(o, {
                step: 0,
                margin: 0,
                valueField: "..value",
                _init: function () {
                    var t = this.edges.slice(0);
                    this.edges = t, t.map(function (t) {
                        return t["..value"] = 1, !0
                    }), this._initNode()
                }, _calculateStep: function () {
                    var t = this,
                        e = t.nodes,
                        n = t.stepField;
                    if (i.isNull(e[0][n])) {
                        var r = e.filter(function (t) {
                            return 0 === t.inEdges.length
                        });
                        0 === r.length && (r = [e[0]]), t._setNodesStep(r)
                    }
                    e.map(function (e) {
                        return void 0 === e.step && (e.step = t.step, t.step = t.step + 1, t._setNodesStep([e])), !0
                    })
                }, _setNodesStep: function (t) {
                    var e = this,
                        n = e.step,
                        r = e.stepField,
                        o = t.filter(function (t) {
                            return i.isNull(t[r])
                        });
                    if (o.length > 0) {
                        o.map(function (t) {
                            return t[r] = n, !0
                        }), e.step = n + 1;
                        var a = e._getNextNodes(o);
                        a.length > 0 && e._setNodesStep(a)
                    }
                }, _getNextNodes: function (t) {
                    var e = this,
                        n = e.targetField,
                        r = e.stepField,
                        o = [];
                    return t.forEach(function (t) {
                        t.outEdges.length > 0 && t.outEdges.forEach(function (a) {
                            var s = a[n];
                            if (s !== t.id) {
                                var u = e._findObj(s);
                                i.isNull(u[r]) && o.push(u)
                            }
                        })
                    }), o
                }, _calculateValue: function () {
                    var t = this,
                        e = t.nodes,
                        n = t.valueField;
                    e.map(function (t) {
                        return t[n] = 1, !0
                    })
                }, _layoutByWeight: function (t) {
                    var e = t.length,
                        n = 1 / e,
                        i = this.y,
                        r = this;
                    t.map(function (t, e) {
                        return t.x = (e + .5) * n, t.y = void 0 === t.y ? i : t.y, r.onNodeChange(t.id, {
                            x: t.x,
                            y: t.y
                        }), !0
                    })
                }, _layoutHighStep: function (t, e) {
                    var n = this,
                        i = n.y,
                        r = e === n.sourceField ? n.targetField : n.sourceField;
                    t.map(function (t) {
                        var o = n._getEdgeOfCurNode(t, r),
                            a = 0,
                            s = void 0,
                            u = 0,
                            c = e === n.sourceField ? t.step - 1 : t.step + 1;
                        return o.forEach(function (t) {
                            s = n._findObj(t[e]), s.step === c && (u++, a += s.x)
                        }), t.x = a / u, t.y = void 0 === t.y ? i : t.y, n.onNodeChange(t.id, {
                            x: t.x,
                            y: t.y
                        }), !0
                    })
                }, _layoutNodes: function (t, e) {
                    var n = this;
                    if (t.length >= 2) {
                        var i = void 0;
                        for (i = 1; i < t.length; i++) n.y = i / (n.totalStep - 1), n._layoutHighStep(t[i], e), t[i].sort(function (t, e) {
                            return t.x - e.x
                        }), n._layoutByWeight(t[i])
                    }
                }, onNodeChange: function () {}, getNodes: function () {
                    var t = o.superclass.getNodes.call(this),
                        e = this.stepField,
                        n = this.valueField;
                    return t.map(function (t) {
                        return delete t.inEdges, delete t.outEdges, delete t[e], delete t[n], !0
                    }), t
                }, start: function () {
                    this.getNodes()
                }
            }), t.exports = o
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(175),
                o = function (t) {
                    i.mix(this, t), this._init()
                };
            i.augment(o, {
                graph: null,
                stiffness: 200,
                repulsion: 400,
                minEnergyThreshold: .01,
                damping: .3,
                _init: function () {
                    var t = this,
                        e = {
                            nodes: [],
                            edges: []
                        };
                    i.each(t.nodes, function (t) {
                        e.nodes.push(t.id)
                    }), i.each(t.edges, function (t) {
                        e.edges.push([t.source, t.target])
                    });
                    var n = new r.Graph,
                        o = new r.Layout.ForceDirected(n, this.stiffness, this.repulsion, this.damping, this.minEnergyThreshold),
                        a = new r.Renderer(o, function () {}, function () {}, function (e, n) {
                            t.onNodeChange(e.id, n)
                        }, function () {
                            t.onFinish()
                        }, function () {
                            t.onStart()
                        });
                    n.loadJSON(e), this.layout = o, this.renderer = a
                }, onNodeChange: function () {}, onEdgeChange: function () {}, onClear: function () {}, onFinish: function () {}, onStart: function () {}, start: function () {
                    this.renderer.start()
                }
            }), t.exports = o
        },
        function (t, e) {
            "use strict";
            var n = {},
                i = n.Vector = function (t, e) {
                    this.x = t, this.y = e
                },
                r = function (t) {
                    for (var e in t)
                        if (t.hasOwnProperty(e)) return !1;
                    return !0
                },
                o = n.Graph = function () {
                    this.nodeSet = {}, this.nodes = [], this.edges = [], this.adjacency = {}, this.nextNodeId = 0, this.nextEdgeId = 0, this.eventListeners = []
                },
                a = n.Node = function (t, e) {
                    this.id = t, this.data = void 0 !== e ? e : {}
                },
                s = n.Edge = function (t, e, n, i) {
                    this.id = t, this.source = e, this.target = n, this.data = void 0 !== i ? i : {}
                };
            o.prototype.addNode = function (t) {
                return t.id in this.nodeSet || this.nodes.push(t), this.nodeSet[t.id] = t, this.notify(), t
            }, o.prototype.addNodes = function () {
                for (var t = 0; t < arguments.length; t++) {
                    var e = arguments[t],
                        n = new a(e, {
                            label: e
                        });
                    this.addNode(n)
                }
            }, o.prototype.addEdge = function (t) {
                var e = !1;
                return this.edges.forEach(function (n) {
                    t.id === n.id && (e = !0)
                }), e || this.edges.push(t), t.source.id in this.adjacency || (this.adjacency[t.source.id] = {}), t.target.id in this.adjacency[t.source.id] || (this.adjacency[t.source.id][t.target.id] = []), e = !1, this.adjacency[t.source.id][t.target.id].forEach(function (n) {
                    t.id === n.id && (e = !0)
                }), e || this.adjacency[t.source.id][t.target.id].push(t), this.notify(), t
            }, o.prototype.addEdges = function () {
                for (var t = 0; t < arguments.length; t++) {
                    var e = arguments[t],
                        n = this.nodeSet[e[0]];
                    if (void 0 === n) throw new TypeError("invalid node name: " + e[0]);
                    var i = this.nodeSet[e[1]];
                    if (void 0 === i) throw new TypeError("invalid node name: " + e[1]);
                    var r = e[2];
                    this.newEdge(n, i, r)
                }
            }, o.prototype.newNode = function (t) {
                var e = new a(this.nextNodeId++, t);
                return this.addNode(e), e
            }, o.prototype.newEdge = function (t, e, n) {
                var i = new s(this.nextEdgeId++, t, e, n);
                return this.addEdge(i), i
            }, o.prototype.loadJSON = function (t) {
                ("string" == typeof t || t instanceof String) && (t = JSON.parse(t)), ("nodes" in t || "edges" in t) && (this.addNodes.apply(this, t.nodes), this.addEdges.apply(this, t.edges))
            }, o.prototype.getEdges = function (t, e) {
                return t.id in this.adjacency && e.id in this.adjacency[t.id] ? this.adjacency[t.id][e.id] : []
            }, o.prototype.removeNode = function (t) {
                t.id in this.nodeSet && delete this.nodeSet[t.id];
                for (var e = this.nodes.length - 1; e >= 0; e--) this.nodes[e].id === t.id && this.nodes.splice(e, 1);
                this.detachNode(t)
            }, o.prototype.detachNode = function (t) {
                var e = this.edges.slice();
                e.forEach(function (e) {
                    e.source.id !== t.id && e.target.id !== t.id || this.removeEdge(e)
                }, this), this.notify()
            }, o.prototype.removeEdge = function (t) {
                for (var e = this.edges.length - 1; e >= 0; e--) this.edges[e].id === t.id && this.edges.splice(e, 1);
                for (var n in this.adjacency) {
                    for (var i in this.adjacency[n]) {
                        for (var o = this.adjacency[n][i], a = o.length - 1; a >= 0; a--) this.adjacency[n][i][a].id === t.id && this.adjacency[n][i].splice(a, 1);
                        0 === this.adjacency[n][i].length && delete this.adjacency[n][i]
                    }
                    r(this.adjacency[n]) && delete this.adjacency[n]
                }
                this.notify()
            }, o.prototype.merge = function (t) {
                var e = [];
                t.nodes.forEach(function (t) {
                    e.push(this.addNode(new a(t.id, t.data)))
                }, this), t.edges.forEach(function (t) {
                    var n = e[t.from],
                        i = e[t.to],
                        r = void 0;
                    r = t.directed ? r = t.type + "-" + n.id + "-" + i.id : n.id < i.id ? t.type + "-" + n.id + "-" + i.id : t.type + "-" + i.id + "-" + n.id;
                    var o = this.addEdge(new s(r, n, i, t.data));
                    o.data.type = t.type
                }, this)
            }, o.prototype.filterNodes = function (t) {
                var e = this.nodes.slice();
                e.forEach(function (e) {
                    t(e) || this.removeNode(e)
                }, this)
            }, o.prototype.filterEdges = function (t) {
                var e = this.edges.slice();
                e.forEach(function (e) {
                    t(e) || this.removeEdge(e)
                }, this)
            }, o.prototype.addGraphListener = function (t) {
                this.eventListeners.push(t)
            }, o.prototype.notify = function () {
                this.eventListeners.forEach(function (t) {
                    t.graphChanged()
                })
            };
            var u = n.Layout = {};
            u.ForceDirected = function (t, e, n, i, r) {
                this.graph = t, this.stiffness = e, this.repulsion = n, this.damping = i, this.minEnergyThreshold = r || .01, this.nodePoints = {}, this.edgeSprings = {}
            }, u.ForceDirected.prototype.point = function (t) {
                if (!(t.id in this.nodePoints)) {
                    var e = void 0 !== t.data.mass ? t.data.mass : 1;
                    this.nodePoints[t.id] = new u.ForceDirected.Point(i.random(), e)
                }
                return this.nodePoints[t.id]
            }, u.ForceDirected.prototype.spring = function (t) {
                if (!(t.id in this.edgeSprings)) {
                    var e = void 0 !== t.data.length ? t.data.length : 1,
                        n = !1,
                        i = this.graph.getEdges(t.source, t.target);
                    if (i.forEach(function (t) {
                        n === !1 && t.id in this.edgeSprings && (n = this.edgeSprings[t.id])
                    }, this), n !== !1) return new u.ForceDirected.Spring(n.point1, n.point2, 0, 0);
                    if (i.forEach(function (t) {
                        n === !1 && t.id in this.edgeSprings && (n = this.edgeSprings[t.id])
                    }, this), n !== !1) return new u.ForceDirected.Spring(n.point2, n.point1, 0, 0);
                    this.edgeSprings[t.id] = new u.ForceDirected.Spring(this.point(t.source), this.point(t.target), e, this.stiffness)
                }
                return this.edgeSprings[t.id]
            }, u.ForceDirected.prototype.eachNode = function (t) {
                var e = this;
                this.graph.nodes.forEach(function (n) {
                    t.call(e, n, e.point(n))
                })
            }, u.ForceDirected.prototype.eachEdge = function (t) {
                var e = this;
                this.graph.edges.forEach(function (n) {
                    t.call(e, n, e.spring(n))
                })
            }, u.ForceDirected.prototype.eachSpring = function (t) {
                var e = this;
                this.graph.edges.forEach(function (n) {
                    t.call(e, e.spring(n))
                })
            }, u.ForceDirected.prototype.applyCoulombsLaw = function () {
                this.eachNode(function (t, e) {
                    this.eachNode(function (t, n) {
                        if (e !== n) {
                            var i = e.p.subtract(n.p),
                                r = i.magnitude() + .1,
                                o = i.normalise();
                            e.applyForce(o.multiply(this.repulsion).divide(r * r * .5)), n.applyForce(o.multiply(this.repulsion).divide(r * r * -.5))
                        }
                    })
                })
            }, u.ForceDirected.prototype.applyHookesLaw = function () {
                this.eachSpring(function (t) {
                    var e = t.point2.p.subtract(t.point1.p),
                        n = t.length - e.magnitude(),
                        i = e.normalise();
                    t.point1.applyForce(i.multiply(t.k * n * -.5)), t.point2.applyForce(i.multiply(t.k * n * .5))
                })
            }, u.ForceDirected.prototype.attractToCentre = function () {
                this.eachNode(function (t, e) {
                    var n = e.p.multiply(-1);
                    e.applyForce(n.multiply(this.repulsion / 50))
                })
            }, u.ForceDirected.prototype.updateVelocity = function (t) {
                this.eachNode(function (e, n) {
                    n.v = n.v.add(n.a.multiply(t)).multiply(this.damping), n.a = new i(0, 0)
                })
            }, u.ForceDirected.prototype.updatePosition = function (t) {
                this.eachNode(function (e, n) {
                    n.p = n.p.add(n.v.multiply(t))
                })
            }, u.ForceDirected.prototype.totalEnergy = function () {
                var t = 0;
                return this.eachNode(function (e, n) {
                    var i = n.v.magnitude();
                    t += .5 * n.m * i * i
                }), t
            };
            var c = function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            };
            n.requestAnimationFrame = c(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
                window.setTimeout(t, 10)
            }, void 0), u.ForceDirected.prototype.start = function (t, e, i) {
                var r = this;
                this._started || (this._started = !0, this._stop = !1, void 0 !== i && i(), n.requestAnimationFrame(function i() {
                    r.tick(.03), void 0 !== t && t(), r._stop || r.totalEnergy() < r.minEnergyThreshold ? (r._started = !1, void 0 !== e && e()) : n.requestAnimationFrame(i)
                }))
            }, u.ForceDirected.prototype.stop = function () {
                this._stop = !0
            }, u.ForceDirected.prototype.tick = function (t) {
                this.applyCoulombsLaw(), this.applyHookesLaw(), this.attractToCentre(), this.updateVelocity(t), this.updatePosition(t)
            }, u.ForceDirected.prototype.nearest = function (t) {
                var e = {
                        node: null,
                        point: null,
                        distance: null
                    },
                    n = this;
                return this.graph.nodes.forEach(function (i) {
                    var r = n.point(i),
                        o = r.p.subtract(t).magnitude();
                    (null === e.distance || o < e.distance) && (e = {
                        node: i,
                        point: r,
                        distance: o
                    })
                }), e
            }, u.ForceDirected.prototype.getBoundingBox = function () {
                var t = new i(-2, -2),
                    e = new i(2, 2);
                this.eachNode(function (n, i) {
                    i.p.x < t.x && (t.x = i.p.x), i.p.y < t.y && (t.y = i.p.y), i.p.x > e.x && (e.x = i.p.x), i.p.y > e.y && (e.y = i.p.y)
                });
                var n = e.subtract(t).multiply(.07);
                return {
                    bottomleft: t.subtract(n),
                    topright: e.add(n)
                }
            }, i.random = function () {
                return new i(10 * (Math.random() - .5), 10 * (Math.random() - .5))
            }, i.prototype.add = function (t) {
                return new i(this.x + t.x, this.y + t.y)
            }, i.prototype.subtract = function (t) {
                return new i(this.x - t.x, this.y - t.y)
            }, i.prototype.multiply = function (t) {
                return new i(this.x * t, this.y * t)
            }, i.prototype.divide = function (t) {
                return new i(this.x / t || 0, this.y / t || 0)
            }, i.prototype.magnitude = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            }, i.prototype.normal = function () {
                return new i(-this.y, this.x)
            }, i.prototype.normalise = function () {
                return this.divide(this.magnitude())
            }, u.ForceDirected.Point = function (t, e) {
                this.p = t, this.m = e, this.v = new i(0, 0), this.a = new i(0, 0)
            }, u.ForceDirected.Point.prototype.applyForce = function (t) {
                this.a = this.a.add(t.divide(this.m))
            }, u.ForceDirected.Spring = function (t, e, n, i) {
                this.point1 = t, this.point2 = e, this.length = n, this.k = i
            };
            var h = n.Renderer = function (t, e, n, i, r, o) {
                this.layout = t, this.clear = e, this.drawEdge = n, this.drawNode = i, this.onRenderStop = r, this.onRenderStart = o, this.layout.graph.addGraphListener(this)
            };
            h.prototype.graphChanged = function () {
                this.start()
            }, h.prototype.start = function () {
                var t = this;
                this.layout.start(function () {
                    t.clear(), t.layout.eachEdge(function (e, n) {
                        t.drawEdge(e, n.point1.p, n.point2.p)
                    }), t.layout.eachNode(function (e, n) {
                        t.drawNode(e, n.p)
                    })
                }, this.onRenderStop, this.onRenderStart)
            }, h.prototype.stop = function () {
                this.layout.stop()
            }, t.exports = n
        },
        function (t, e) {
            "use strict";

            function n(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function i(t, e, n) {
                n ? (e.x = t.x, e.y = t.y) : (e.x = t.y, e.y = t.x), t.children.forEach(function (t, r) {
                    i(t, e.children[r], n)
                })
            }
            var r = Object.assign || function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
                    }
                    return t
                },
                o = function t(e) {
                    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                    n(this, t);
                    var r = this;
                    r.x = r.y = 0, r.leftChild = r.rightChild = null, r.height = e || 0, r.children = i
                },
                a = {
                    isHorizontal: !0,
                    nodeSep: 20,
                    nodeSize: 20,
                    rankSep: 200,
                    subTreeSep: 10
                };
            t.exports = function (t) {
                function e(t) {
                    if (!t) return null;
                    t.width = 0, t.depth && t.depth > c && (c = t.depth);
                    var n = t.children,
                        i = n.length,
                        r = new o(t.height, []);
                    return n.forEach(function (t, n) {
                        var o = e(t);
                        r.children.push(o), 0 === n && (r.leftChild = o), n === i - 1 && (r.rightChild = o)
                    }), r.originNode = t, r.isLeaf = t.isLeaf(), r
                }

                function n(t) {
                    if (t.isLeaf || 0 === t.children.length) t.drawingDepth = c;
                    else {
                        var e = t.children.map(function (t) {
                                return n(t)
                            }),
                            i = Math.min.apply(null, e);
                        t.drawingDepth = i - 1
                    }
                    return t.drawingDepth
                }

                function s(t) {
                    t.x = t.drawingDepth * u.rankSep, t.isLeaf ? (t.y = 0, h && (t.y = h.y + h.height + u.nodeSep, t.originNode.parent !== h.originNode.parent && (t.y += u.subTreeSep)), h = t) : (t.children.forEach(function (t) {
                        s(t)
                    }), t.y = (t.leftChild.y + t.rightChild.y) / 2)
                }
                var u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                u = r({}, a, u);
                var c = 0,
                    h = void 0,
                    l = e(t);
                return n(l), s(l), i(l, t, u.isHorizontal), t
            }
        },
        function (t, e) {
            "use strict";

            function n(t, e, n) {
                t.x += n * t.depth, t.y = e ? e.y + e.height : 0
            }
            var i = 20;
            t.exports = function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i,
                    r = null;
                t.eachNode(function (t) {
                    n(t, r, e), r = t
                })
            }
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                for (var n = Object.getOwnPropertyNames(e), i = 0; i < n.length; i++) {
                    var r = n[i],
                        o = Object.getOwnPropertyDescriptor(e, r);
                    o && o.configurable && void 0 === t[r] && Object.defineProperty(t, r, o)
                }
                return t
            }

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function o(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }

            function a(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : i(t, e))
            }
            var s = n(14),
                u = n(72),
                c = n(32),
                h = function (t) {
                    function e() {
                        return r(this, e), o(this, t.apply(this, arguments))
                    }
                    return a(e, t), e.prototype.execute = function () {
                        t.prototype._prepareRoot.call(this);
                        var e = this;
                        return e.options.forceAlign = "R", c(e.rootNode, e.options, u)
                    }, e
                }(s);
            t.exports = h
        },
        function (t, e) {
            "use strict";
            t.exports = {
                T: {
                    x: .5,
                    y: 0
                },
                R: {
                    x: 1,
                    y: .5
                },
                B: {
                    x: .5,
                    y: 1
                },
                L: {
                    x: 0,
                    y: .5
                },
                C: null
            }
        },
        function (t, e) {
            "use strict";
            t.exports = ["LR", "RL", "TB", "BT", "H", "V"]
        },
        function (t, e) {
            "use strict";
            t.exports = ["LR", "RL", "H", "L", "R"]
        },
        function (t, e) {
            "use strict";
            t.exports = 18
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                for (var n = Object.getOwnPropertyNames(e), i = 0; i < n.length; i++) {
                    var r = n[i],
                        o = Object.getOwnPropertyDescriptor(e, r);
                    o && o.configurable && void 0 === t[r] && Object.defineProperty(t, r, o)
                }
                return t
            }

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function o(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }

            function a(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : i(t, e))
            }
            var s = n(14),
                u = n(176),
                c = n(32),
                h = function (t) {
                    function e() {
                        return r(this, e), o(this, t.apply(this, arguments))
                    }
                    return a(e, t), e.prototype.execute = function () {
                        t.prototype._prepareRoot.call(this);
                        var e = this,
                            n = e.rootNode,
                            i = e.options;
                        return n.width = 0, c(n, i, u), n
                    }, e
                }(s);
            t.exports = h
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                for (var n = Object.getOwnPropertyNames(e), i = 0; i < n.length; i++) {
                    var r = n[i],
                        o = Object.getOwnPropertyDescriptor(e, r);
                    o && o.configurable && void 0 === t[r] && Object.defineProperty(t, r, o)
                }
                return t
            }

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function o(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }

            function a(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : i(t, e))
            }
            var s = n(14),
                u = n(177),
                c = n(74),
                h = n(73),
                l = ["LR", "RL", "H"],
                d = l[0],
                f = function (t) {
                    function e() {
                        return r(this, e), o(this, t.apply(this, arguments))
                    }
                    return a(e, t), e.prototype.execute = function () {
                        t.prototype._prepareRoot.call(this);
                        var e = this,
                            n = e.rootNode,
                            i = e.options;
                        i.isHorizontal = !0;
                        var r = i.indent;
                        e.options.forceAlign = "R";
                        var o = i.direction || d;
                        if (o && l.indexOf(o) === -1) throw new TypeError("Invalid direction: " + o);
                        if (o === l[0]) u(n, r), c(n, "L", "L", i);
                        else if (o === l[1]) u(n, r), n.right2left(), c(n, "R", "R", i);
                        else if (o === l[2]) {
                            var a = h(n, i),
                                s = a.left,
                                f = a.right;
                            u(s, r), s.right2left(), c(s, "R", "R", i), u(f, r), c(f, "L", "L", i);
                            var g = s.getBoundingBox();
                            f.translate(g.width, 0), n.x = f.x - n.width / 2, c(n, "B", "B", i, !0)
                        }
                        return n.eachNode(function (t) {
                            var e = t.data;
                            e.x = t.x + t.width / 2 + t.hgap, e.y = t.y + t.height / 2 + t.vgap, e.align = t.align, e.inAnchor = t.inAnchor ? [t.inAnchor.x, t.inAnchor.y] : null, e.outAnchor = t.outAnchor ? [t.outAnchor.x, t.outAnchor.y] : null
                        }), n
                    }, e
                }(s);
            t.exports = f
        },
        function (t, e, n) {
            "use strict";

            function i(t, e) {
                for (var n = Object.getOwnPropertyNames(e), i = 0; i < n.length; i++) {
                    var r = n[i],
                        o = Object.getOwnPropertyDescriptor(e, r);
                    o && o.configurable && void 0 === t[r] && Object.defineProperty(t, r, o)
                }
                return t
            }

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function o(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }

            function a(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : i(t, e))
            }
            var s = Object.assign || function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
                    }
                    return t
                },
                u = n(33),
                c = n(14),
                h = n(72),
                l = n(32),
                d = {
                    nodeSize: 20,
                    nodeSep: 20,
                    rankSep: 200
                },
                f = function (t) {
                    function e() {
                        return r(this, e), o(this, t.apply(this, arguments))
                    }
                    return a(e, t), e.prototype.execute = function () {
                        t.prototype._prepareRoot.call(this);
                        var e = this,
                            n = s({}, d, e.options),
                            i = n.nodeSize || d.nodeSize,
                            r = n.nodeSep || d.nodeSep,
                            o = n.rankSep || d.rankSep;
                        e.rootNode = new u(e.root, s(n, {
                            getWidth: function () {
                                return i
                            }, getHeight: function () {
                                return i
                            }, getHGap: function () {
                                return o
                            }, getVGap: function () {
                                return r
                            }
                        }));
                        var a = e.rootNode;
                        return l(a, n, h), a
                    }, e
                }(c);
            t.exports = f
        },
        function (t, e) {
            "use strict";
            var n = {
                R: "L",
                L: "R",
                T: "B",
                B: "T"
            };
            t.exports = function (t) {
                return n[t]
            }
        },
        function (t, e) {
            "use strict";
            t.exports = function (t, e, n) {
                if (!(e >= n)) {
                    var i = t.splice(e, 1)[0];
                    t.splice(n, 0, i)
                }
            }
        },
        function (t, e) {
            "use strict";
            t.exports = function (t, e, n) {
                if (!(e <= n)) {
                    var i = t.splice(e, 1)[0];
                    t.splice(n - 1, 0, i)
                }
            }
        },
        function (t, e, n) {
            "use strict";
            var i = n(181);
            t.exports = function (t) {
                return i.indexOf(t) > -1
            }
        },
        function (t, e, n) {
            "use strict";
            n(65), n(147), n(150), n(148), n(164), n(149), n(152), n(67), n(153), n(154), n(19), n(156), n(155), n(157), n(158), n(161), n(159), n(162), n(163), n(165), n(166), n(167), n(168), n(68), n(171), n(172), n(160), n(66), n(170)
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(13),
                o = r.Util,
                a = {
                    max: 5,
                    current: 0,
                    cache: []
                },
                s = {
                    nodes: [],
                    edges: []
                },
                u = function () {};
            u.ATTRS = {
                clipboard: !1,
                rollback: !1
            }, i.augment(u, {
                _initEditor: function () {
                    var t = this.get("rollback"),
                        e = this.get("clipboard");
                    t && (i.isObject(t) ? this.set("rollback", i.mix({}, a, t)) : this.set("rollback", i.clone(a))), e && this.set("clipboard", i.clone(s))
                }, _changeData: function (t, e) {
                    this._clearInner(), this._initData(), this.source(t, e), this.render(!1)
                }, updateRollback: function () {
                    var t = this.get("rollback");
                    if (i.isObject(t)) {
                        var e = t.current,
                            n = t.cache,
                            r = t.max,
                            o = n.length,
                            a = this.save().source;
                        n.splice(0, e, a), o > r && n.splice(r, o - r + 1), t.current = 0
                    }
                }, copy: function () {
                    var t = this,
                        e = t.getAllActived(),
                        n = t.get("clipboard"),
                        r = {},
                        a = void 0,
                        s = void 0,
                        u = void 0;
                    n.nodes = [], n.edges = [], i.each(e, function (c) {
                        a = i.mix(!0, {}, c.get("model"), {
                            id: o.guid()
                        }), r[c.get("model").id] = a.id, t.isNode(c) ? (a.x += 10, a.y -= 10, n.nodes.push(a)) : (s = c.get("model").target, u = c.get("model").source, s = t.find(s), u = t.find(u), e.indexOf(s) !== -1 && e.indexOf(u) !== -1 && (a.controlPoints && i.each(a.controlPoints, function (t, e) {
                            a.controlPoints[e] = {
                                x: t.x += 10,
                                y: t.y -= 10
                            }
                        }), a.target = r[a.target], a.source = r[a.source], n.edges.push(a)))
                    }), this.refresh()
                }, paste: function () {
                    var t = this,
                        e = t.get("clipboard"),
                        n = t._addNodes(e.nodes);
                    n = n.concat(t._addEdges(e.edges)), t.clearAllActived(), t.setItemsActived(n), e.nodes = [], e.edges = [], t.updateRollback(), this.refresh()
                }, del: function () {
                    var t = this,
                        e = t.getAllActived();
                    i.each(e, function (e) {
                        t.removeItem(e)
                    }), this.updateRollback(), this.refresh()
                }, undo: function () {
                    var t = this.get("rollback");
                    if (i.isObject(t)) {
                        var e = t.cache,
                            n = t.current,
                            r = n + 1,
                            o = e[r];
                        0 !== e.length && o && (o = i.clone(o), this._changeData(o.nodes, o.edges), t.current = r, this.refresh())
                    }
                }, updo: function () {
                    this.undo()
                }, redo: function () {
                    var t = this.get("rollback");
                    if (i.isObject(t)) {
                        var e = t.cache,
                            n = t.current,
                            r = n - 1,
                            o = e[r];
                        0 !== e.length && o && (o = i.clone(o), this._changeData(o.nodes, o.edges), t.current = r, this.refresh())
                    }
                }, beginAdd: function (t, e) {
                    this.changeMode("add"), this.set("addingType", t), this.set("addingModel", e)
                }, endAdd: function (t) {
                    this.changeMode("edit"), this.set("addingType", ""), this.set("addingModel", null), t && this.fire("afteradd", {
                        item: t
                    })
                }
            }), t.exports = u
        },
        function (t, e, n) {
            "use strict";
            var i = n(193);
            n(190), i.Mode = {
                default: ["dragNode", "dragEdge", "dragBlank", "clickBlankClearActive", "resizeEdge", "clickActive", "resizeNode", "wheelZoom", "dragNodeEndSetActive", "clickFocus"],
                edit: ["dragNode", "dragEdge", "clickBlankClearActive", "resizeEdge", "clickActive", "dragNodeEndSetActive", "multiSelect", "resizeNode", "shortcut", "wheelZoom", "hoverNodeShowAnchor", "hoverAnchorSetActived", "dragEdgeEndHideAnchor", "dragNodeEndHideAnchor", "clickFocus"],
                drag: ["shortcut", "dragCanvas", "wheelZoom", "clickFocus"],
                add: ["clickAddNode", "dragAddEdge", "hoverAnchorSetActived", "hoverNodeShowAnchor", "clickFocus"],
                complicated: ["dragCanvas", "wheelZoom", "dragHideEdges", "wheelZoomHideEdges", "clickFocus"],
                analysis: ["dragCanvas", "wheelZoom", "dragHideEdges", "wheelZoomAutoTexts", "wheelZoomHideEdges", "wheelZoomHideTexts", "clickFocus"],
                none: []
            }, t.exports = i
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(191),
                o = n(13),
                a = function t(e) {
                    t.superclass.constructor.call(this, e)
                };
            a.ATTRS = {
                defaultNodeShape: "rect",
                layoutEdgeFilter: null,
                layoutNodeFilter: null
            }, i.extend(a, o), i.mixin(a, [r]), i.augment(a, {
                _initCfg: function () {
                    var t = this.get("mode");
                    "analysis" === t && (this.set("useAnchor", !1), this.set("useFreezeSizeGroup", !0), this.set("useEdgeSortGroup", !1), this.set("grid", null)), "edit" === t && (this.set("wheelScaleLimit", [.5, 4]), this.set("rollback", !0), this.set("clipboard", !0)), a.superclass._initCfg.call(this)
                }, _readSource: function (t) {
                    this.source(t.nodes, t.edges)
                }, source: function (t, e) {
                    i.isObject(t) ? (this.set("nodes", t.nodes), this.set("edges", t.edges)) : (this.set("nodes", t), this.set("edges", e))
                }, _saveSource: function () {
                    function t(t, e) {
                        i.each(t.get("children"), function (t) {
                            var n = t.get("id"),
                                i = s[n];
                            e.push(i.get("model"))
                        })
                    }
                    var e = this,
                        n = [],
                        r = [],
                        o = e.get("nodeGroup"),
                        a = e.get("edgeGroup"),
                        s = e.get("itemCache");
                    return t(o, n), t(a, r), i.clone({
                        nodes: n,
                        edges: r
                    })
                }, getLayoutNodes: function () {
                    var t = this.getNodes(function (t) {
                            return t.getModel()
                        }),
                        e = this.get("layoutNodeFilter");
                    return e ? i.filter(t, e) : t
                }, getLayoutEdges: function () {
                    var t = this.getEdges(function (t) {
                            return t.getModel()
                        }),
                        e = this.get("layoutEdgeFilter");
                    return e ? i.filter(t, e) : t
                }, layout: function t() {
                    var t = this.get("layout"),
                        e = this.getLayoutNodes(),
                        n = this.getLayoutEdges();
                    i.isObject(t) ? (t.nodes = e, t.edges = n, t.graphHeight = this.get("height"), t.graphWidth = this.get("width"), t.execute()) : i.isFunction(t) && t(e, n), this.updateNodesPosition()
                }, changeLayout: function (t) {
                    this.set("layout", t), this.layout()
                }, render: function (t) {
                    void 0 === t && (t = this.get("rollback")), a.superclass.render.call(this), t !== !1 && this.updateRollback()
                }, add: function (t, e) {
                    var n = this,
                        i = void 0;
                    return "node" === t ? i = n._addNodes([e]) : "edge" === t && (i = n._addEdges([e])), this.draw(), i[0]
                }, update: function (t, e) {
                    this.updateItem(t, e), this.draw()
                }, remove: function (t) {
                    this.removeItem(t), this.draw()
                }
            }), t.exports = a
        },
        function (t, e, n) {
            "use strict";
            var i = n(59),
                r = n(75),
                o = {
                    g6: !0,
                    version: r,
                    page_type: "syslog"
                };
            setTimeout(function () {
                if (i.tracking) {
                    var t = new i;
                    t.log(o)
                }
            }, 100), t.exports = o
        },
        function (t, e, n) {
            "use strict";
            n(67), n(151), n(169), n(65), n(68)
        },
        function (t, e, n) {
            "use strict";
            var i = n(13),
                r = n(197);
            n(195), r.Mode = {
                default: ["dragBlank", "collapse", "spreadout", "buttonPointer", "wheelZoom", "clickFocus"],
                none: []
            }, i.registNode("tree-node", {
                style: function () {
                    return {
                        fillOpacity: 1
                    }
                }
            }, "rect"), t.exports = r
        },
        function (t, e, n) {
            "use strict";
            var i = n(1),
                r = n(69),
                o = n(24),
                a = n(198),
                s = n(7),
                u = n(13),
                c = o.Util,
                h = u.Util,
                l = function t(e) {
                    t.superclass.constructor.call(this, e)
                };
            l.ATTRS = {
                layoutFn: r.CompactBoxTree,
                layoutCfg: {
                    direction: "LR",
                    getHGap: function () {
                        return 40
                    }, getVGap: function () {
                        return 10
                    }
                },
                layout: null,
                grid: null,
                data: null,
                dataMap: null,
                showButton: !0,
                defaultNodeShape: "tree-node",
                animate: !0
            }, i.extend(l, u), i.augment(l, {
                _readSource: function (t) {
                    this.source(t)
                }, _saveSource: function () {
                    var t = this.get("data"),
                        e = a.clone(t, {
                            parent: !0
                        });
                    return e
                }, _createMap: function (t) {
                    var e = {};
                    return a.traverseTree(t, function (n, i) {
                        n.id || (n.id = h.guid()), i ? n.parent = i : t.root = !0, e[n.id] = n
                    }), e
                }, layout: function t() {
                    var t = this.get("layout"),
                        e = this.get("data");
                    e && (i.isObject(t) ? t.execute() : i.isFunction(t) && t(e), this.updateNodesPosition())
                }, source: function (t) {
                    if (t) {
                        var e = this._createMap(t),
                            n = this.get("layout"),
                            r = void 0,
                            o = void 0;
                        i.isObject(n) ? (n.root = t, r = n.getNodes(), o = n.getEdges()) : (r = [], o = [], a.traverseTree(t, function (t, e) {
                            r.push(t), e && o.push({
                                id: e.id + "-" + t.id,
                                source: e.id,
                                target: t.id
                            })
                        }, function (t) {
                            return t.isCollapsed
                        })), this.set("dataMap", e), this.set("nodes", r), this.set("edges", o)
                    }
                    this.set("data", t)
                }, reRender: function () {
                    var t = this.get("data");
                    this.clearAllActived(), this.refreshFront(), this._clearInner(), this._initData(), this.source(t), this._drawInner(), this.draw()
                }, enterAnimate: function (t, e, n) {
                    var i = h.getBBox(t, t),
                        r = i.centerX,
                        o = i.centerY,
                        s = t.get("shapeCfg"),
                        u = s.origin,
                        l = void 0;
                    l = "node" === t.get("type") ? a.getButtonPoint(u, e, r, o) : a.getButtonPoint(n[u.target].model, e, r, o), c.scaleIn(t, l.x, l.y, r, o)
                }, leaveAnimate: function (t, e, n) {
                    var i = h.getBBox(t, t),
                        r = i.centerX,
                        o = i.centerY,
                        s = t.get("shapeCfg"),
                        u = s.origin,
                        l = void 0;
                    l = "node" === t.get("type") ? a.getButtonPoint(u, n, r, o) : a.getButtonPoint(e[u.target].model, n, r, o), c.scaleOut(t, l.x, l.y)
                }, beforeNodeDraw: function (t) {
                    var e = this,
                        n = t.getShapeCfg(),
                        r = e.get("layout");
                    i.isObject(r) && (n.direction = r.options.direction), t.addChild = function (n) {
                        return e.add(t.get("id"), n)
                    }
                }, afterNodeDraw: function (t) {
                    var e = this.get("showButton"),
                        n = t.get("group"),
                        i = t.getShapeCfg(),
                        r = t.getKeyShape(),
                        o = t.get("shapeObj"),
                        u = i.origin,
                        c = r.getBBox(),
                        l = u.inAnchor,
                        d = u.outAnchor,
                        f = void 0;
                    if (l) {
                        o.getAnchorPoints = function () {
                            return [l, d]
                        };
                        var g = t.calculateAnchorPoints(c);
                        if (!u.root && g) {
                            switch (f = h.getpointInRectQuadrant(c, g[1])) {
                            case 0:
                                i.buttonX = g[1].x, i.buttonY = g[1].y - s.treeButtonRadius;
                                break;
                            case 1:
                                i.buttonX = g[1].x + s.treeButtonRadius, i.buttonY = g[1].y;
                                break;
                            case 2:
                                i.buttonX = g[1].x, i.buttonY = g[1].y + s.treeButtonRadius;
                                break;
                            case 3:
                                i.buttonX = g[1].x - s.treeButtonRadius, i.buttonY = g[1].y;
                                break;
                            default:
                                i.buttonX = g[1].x, i.buttonY = g[1].y
                            }
                            if (u.isCollapsed ? i.buttonType = "plus" : i.buttonType = "minus", !e) return n.set("buttonX", (c.minX + c.maxX) / 2), void n.set("buttonY", (c.minY + c.maxY) / 2);
                            u.children && 0 !== u.children.length && a.drawButton(i, n), n.set("buttonX", i.buttonX), n.set("buttonY", i.buttonY)
                        }
                    }
                }, changeLayout: function (t) {
                    this.set("layout", t), this.reRender()
                }, add: function (t, e) {
                    var n = this.get("dataMap"),
                        r = n[t],
                        o = e.id;
                    return o || (o = i.guid(), e.id = o), i.isArray(r.children) ? r.children.push(e) : r.children = [e], this.reRender(), this.find(o)
                }, remove: function (t) {
                    var e = this.get("dataMap"),
                        n = void 0;
                    i.isString(t) && (t = e[t]);
                    var r = t.parent;
                    return r ? (n = r.children, r.children = i.filter(n, function (e) {
                        return t !== e
                    })) : this.source({}), this.reRender(), this
                }, update: function (t, e) {
                    return l.superclass.updateItem.call(this, t, e), this.reRender(), t
                }, _checkData: function (t) {
                    return t && i.isObject(t) && h.objectToValues(t).length > 0
                }
            }), t.exports = l
        },
        function (t, e, n) {
            "use strict";
            var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                },
                r = n(1),
                o = n(13),
                a = n(7),
                s = o.Util,
                u = {
                    traverseTree: function (t, e, n, i) {
                        var o = t.children;
                        e(t, i), n && n(t) || o && r.each(o, function (i) {
                            u.traverseTree(i, e, n, t)
                        })
                    }, getButtonPoint: function (t, e, n, i) {
                        for (var r = t.parent, o = void 0; t && r && !e[r.id];) r = r.parent;
                        return r ? (o = e[r.id].origin, s.applyPoint({
                            x: o.get("buttonX"),
                            y: o.get("buttonY")
                        }, o)) : {
                            x: n,
                            y: i
                        }
                    }, clone: function (t, e) {
                        var n = void 0;
                        if (r.isArray(t)) {
                            n = [];
                            for (var o = 0, a = t.length; o < a; o++) "object" === i(t[o]) && null !== t[o] ? n[o] = u.clone(t[o], e) : n[o] = t[o]
                        } else {
                            n = {};
                            for (var s in t) e[s] || ("object" === i(t[s]) && null !== t[s] ? n[s] = u.clone(t[s], e) : n[s] = t[s])
                        }
                        return n
                    }, drawButton: function (t, e) {
                        "plus" === t.buttonType ? u.drawspreadoutButton(t.buttonX, t.buttonY, a.treeButtonRadius, a.treeButtonPadding, e) : u.drawcollapseButton(t.buttonX, t.buttonY, a.treeButtonRadius, a.treeButtonPadding, e)
                    }, drawspreadoutButton: function (t, e, n, i, o) {
                        var s = n - i,
                            u = o.addShape("path", {
                                attrs: r.mix({}, {
                                    path: [
                                        ["M", 0, 0 - n],
                                        ["a", n, n, 0, 1, 1, 0, 2 * n],
                                        ["a", n, n, 0, 1, 1, 0, -2 * n],
                                        ["z"],
                                        ["M", 0 - s, 0],
                                        ["L", 0 + s, 0],
                                        ["M", 0, 0 - s],
                                        ["L", 0, 0 + s]
                                    ]
                                }, a.treeButtonStyle),
                                clickActive: !1,
                                class: "spreadoutButton"
                            });
                        return u.translate(t, e), u
                    }, drawcollapseButton: function (t, e, n, i, o) {
                        var s = n - i,
                            u = o.addShape("path", {
                                attrs: r.mix({}, {
                                    path: [
                                        ["M", 0, 0 - n],
                                        ["a", n, n, 0, 1, 1, 0, 2 * n],
                                        ["a", n, n, 0, 1, 1, 0, -2 * n],
                                        ["z"],
                                        ["M", 0 - s, 0],
                                        ["L", 0 + s, 0]
                                    ]
                                }, a.treeButtonStyle),
                                clickActive: !1,
                                class: "collapseButton"
                            });
                        return u.translate(t, e), u
                    }
                };
            t.exports = u
        }
    ])
});