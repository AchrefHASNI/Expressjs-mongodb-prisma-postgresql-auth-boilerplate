const getProtectedData = (req, res) => {
  res.send('Access granted to protected route');
};

module.exports = { getProtectedData };
