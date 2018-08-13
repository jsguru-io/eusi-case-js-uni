const eusiNode = require('eusi-sdk-node');
const eusi = eusiNode({
    bucketKey: '63c49661-653f-46ce-b6f6-a86e4ba28fe1',
    // eslint-disable-next-line
    bucketSecret: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidWNrZXRfaWQiOiI2M2M0OTY2MS02NTNmLTQ2Y2UtYjZmNi1hODZlNGJhMjhmZTEiLCJpZCI6IjI1NTI3MTY5LWRjNzUtNDQxNy04YWNiLTIyMmNkZDMwMjA4MyIsInRpbWVzdGFtcCI6MTUxOTg2MDI3ODMwNn0.E_Z7gUb2ZJUHu8a_knVPUkSAdsnvnDwzqNxSBE3C17s'
});

module.exports = eusi;