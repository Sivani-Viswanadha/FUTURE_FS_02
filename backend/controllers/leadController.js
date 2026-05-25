const Lead = require("../models/Lead");

exports.create = async (req, res, next) => {
  try {
    const lead = await Lead.create({ ...req.body, owner: req.user._id });
    res.status(201).json({ lead });
  } catch (e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    const { q, status, source, priority, page = 1, limit = 50, sort = "-createdAt" } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (priority) filter.priority = priority;
    if (q) {
      const rx = new RegExp(String(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [{ firstName: rx }, { lastName: rx }, { email: rx }, { company: rx }];
    }
    const skip = (Number(page) - 1) * Number(limit);
    const [leads, total] = await Promise.all([
      Lead.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Lead.countDocuments(filter),
    ]);
    res.json({ leads, total, page: Number(page), limit: Number(limit) });
  } catch (e) { next(e); }
};

exports.getOne = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ lead });
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ lead });
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted" });
  } catch (e) { next(e); }
};

exports.stats = async (_req, res, next) => {
  try {
    const [total, byStatusAgg, bySourceAgg, pipelineAgg, weekAgg] = await Promise.all([
      Lead.countDocuments(),
      Lead.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Lead.aggregate([{ $group: { _id: "$source", count: { $sum: 1 } } }]),
      Lead.aggregate([{ $match: { status: { $nin: ["Won", "Lost"] } } }, { $group: { _id: null, sum: { $sum: "$dealValue" } } }]),
      Lead.countDocuments({ createdAt: { $gte: new Date(Date.now() - 7 * 86400000) } }),
    ]);
    const byStatus = Object.fromEntries(byStatusAgg.map(x => [x._id, x.count]));
    const bySource = Object.fromEntries(bySourceAgg.map(x => [x._id, x.count]));
    res.json({
      total,
      newThisWeek: weekAgg,
      qualified: byStatus.Qualified || 0,
      pipelineValue: pipelineAgg[0]?.sum || 0,
      byStatus, bySource,
    });
  } catch (e) { next(e); }
};
