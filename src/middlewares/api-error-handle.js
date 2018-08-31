/**
 * 处理api请求时，如果需要返回出错信息，则可以直接使用next(err)，而不是res.apiError(err)了。
 *
 * @author dulin
 * @param {any} err
 * @param {any} req
 * @param {any} res
 * @param {function} next
 * @returns
 */
function apiErrorHandle(err, req, res, next) {
  if (typeof res.apiError === 'function') {
    res.apiError(err);
    return;
  }
  next();
}

module.exports = apiErrorHandle;
