export function errorHandler(err, req, res, next){
    const status = err.statusCode || 500
    res.status(status).json({
        message: err.message || 'Erro interno',
        code: err.code || 'INTERNAL_ERROR',
        status
    })
}
