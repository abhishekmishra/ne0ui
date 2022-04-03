export function sumArr(arr) {
    return arr.reduce((prev, current) => prev + current, 0);
}

function processClaims(claims, avlblLen) {
    var hasInf = false;
    var infCount = 0;
    for (var i = 0; i < claims.length; i++) {
        if (claims[i] == Infinity) {
            hasInf = true;
            infCount += 1;
        }
    }
    if (hasInf) {
        // console.log(`contains ${infCount} infinity claims, need handling`);
        const infClaims = claims.map(x => { if (x == Infinity) { return 1 / infCount * avlblLen } else { return 0; } });
        // console.log(infClaims);
        return infClaims;
    } else {
        const totClaims = sumArr(claims);
        const propClaims = claims.map(x => (x / totClaims * Math.min(totClaims, avlblLen)));
        // console.log(propClaims);
        return propClaims;
    }
}

export function allocateSizes(dimHints, avlblLen) {
    const minArr = dimHints.map((x) => x.min);
    const actualsArr = dimHints.map((x) => x.pref);
    const maxArr = dimHints.map((x) => x.max);

    const sumOfMins = sumArr(minArr);
    const sumOfActuals = sumArr(actualsArr);

    if (sumOfMins > avlblLen) {
        console.error(`min length of all items ${sumOfMins} is greater than available length ${avlblLen}`);
        return null;
    }

    if (sumOfMins == avlblLen) {
        console.log(`min length of all items ${sumOfMins} is equal to available length ${avlblLen}. Allocate min for all.`);
        return minArr;
    }

    if (sumOfMins < avlblLen) {
        // console.log(`space is available ${avlblLen} beyond min ${sumOfMins}`);
        var alloc;
        var claims;
        if (sumOfActuals <= avlblLen) {
            // console.log(`actuals ${sumOfActuals} can be allocated.`);
            alloc = [...actualsArr];
            claims = dimHints.map(x => x.max - x.pref);
        } else {
            // console.log(`actuals ${sumOfActuals} cannot be allocated, start with min.`);
            alloc = [...minArr];
            claims = dimHints.map(x => x.pref - x.min);
            if (sumArr(claims) > 0) {
                //process claims
                var claimsAlloc = processClaims(claims, avlblLen - sumArr(alloc));
                for (var i = 0; i < claimsAlloc.length; i++) {
                    alloc[i] = alloc[i] + claimsAlloc[i];
                }
            }
            if (sumArr(alloc) < avlblLen) {
                claims = [];
                for (var i = 0; i < alloc.length; i++) {
                    claims.push(dimHints[i].max - alloc[i]);
                }
            }
        }

        // console.log(claims);
        if (sumArr(claims) > 0) {
            //process claims
            var claimsAlloc = processClaims(claims, avlblLen - sumArr(alloc));
            for (var i = 0; i < claimsAlloc.length; i++) {
                alloc[i] = alloc[i] + claimsAlloc[i];
            }
        }

        return alloc;
    }
}
