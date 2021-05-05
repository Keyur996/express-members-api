const express = require('express'),
    members = require('../../Members'),
    uuid = require('uuid'),
    router = express.Router();

//get all employee 
router.get("/", (req, res) => {
    res.json(members);
});

//get Single Member
router.get("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    (found) ?
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
        :
        res.status(400).json({ msg: `No member exist of id ${req.params.id}` });
});

// Create Member
router.post("/", (req, res) => {
    // res.json(req.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: "Please inclide a email and Password" });
    }
    members.unshift(newMember);
    res.json(members);
});

//Update Member 
router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        // res.json(members.filter(member => member.id === parseInt(req.params.id)))
        const updateMember = req.body;

        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                res.json({ msg: `Member updated of id: ${req.params.id}`, member })
            }
        });
    } else {
        res.status(400).json({ msg: `No member exist of id ${req.params.id}` });
    }
});

router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const index = members.findIndex(member => member.id === parseInt(req.params.id));
        // console.log(index);
        members.splice(index, 1);
        res.json({ msg: `Member is deleted of id: ${req.params.id}`, members: members.map(member => member) });
    } else {
        res.status(400).json({ msg: `No member exist of id ${req.params.id}` });
    }
});

module.exports = router;