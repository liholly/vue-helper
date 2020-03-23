export default function (obj) {
    var res = new obj.constructor;

    function run(org, target) {
        var i, k;

        function a(k) {
            var v = org[k];
            var constructor = v.constructor;
            if (typeof v === 'object') {
                target[k] = new constructor;
                run(v, target[k])
            }
            else target[k] = v;
        }

        if ('length' in org) for (i = 0; i < org.length; i++) a(i);
        else for (k in org) a(k);
    }

    run(obj, res);

    return res;
}