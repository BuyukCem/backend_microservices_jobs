export default function permit(...permittedRoles) {
    // return a middleware
    return (request, response, next) => {
        if (request.user && permittedRoles.includes(request.user.role)) {
           /* if(request.user.role === 'USER'){
                if(request.user.id === request.params.id){
                    next();
                }else{
                    response.status(403).json({
                        message: 'Forbidden'
                    });
                }
            }else{
                next();
            }*/
            next();
        } else {
            response.status(403).send({
                status: 403,
                message: 'Forbidden',
                success: false
            })
        }
    }
}

const Role = {
    ADMIN: 'ADMIN',
    CLIENT: 'CLIENT',
    USER: 'USER'
}
Object.freeze(Role)
