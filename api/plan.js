export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST to check a payment plan.' });
  }
  const { amount, creditLimit, balance, cashAdvanceLimit } = req.body || {};
  const values = [amount, creditLimit, balance].map(Number);
  if (values.some(value => !Number.isFinite(value)) || values[0] <= 0 || values[1] < 0 || values[2] < 0) {
    return res.status(400).json({ error: 'Enter a valid amount, credit limit, and balance.' });
  }
  const [requested, limit, currentBalance] = values;
  const availableCredit = Math.max(0, limit - currentBalance);
  const cashLimit = cashAdvanceLimit === null || cashAdvanceLimit === '' || cashAdvanceLimit === undefined
    ? null : Number(cashAdvanceLimit);
  if (cashLimit !== null && (!Number.isFinite(cashLimit) || cashLimit < 0)) {
    return res.status(400).json({ error: 'Enter a valid cash advance limit.' });
  }
  const available = cashLimit === null ? availableCredit : Math.min(availableCredit, cashLimit);
  return res.status(200).json({
    approvedByEnteredLimits: requested <= available,
    requested,
    availableCredit,
    availableForCashAdvance: available,
    remainingCreditIfUsed: Math.max(0, availableCredit - requested),
  });
}
