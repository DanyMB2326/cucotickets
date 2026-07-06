export const getHealth = (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'El servidor está activo',
        timestamp: new Date().toISOString(),
    });
};
