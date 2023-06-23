export const defActionSlice = ({
	req,
	reqParams,
	service,
	suc,
	fail
}: defActionInt) => {
	return (dispatch: any) => {
		dispatch(req(reqParams))
		if(service?.func) {
			service.func(service.params)
			.then((res: any) => {
				dispatch(suc(res))
			})
			.catch((err: any) => {
				dispatch(fail({
					err
				}))
			})
		}
	}
}

export interface defActionInt {
	req: any,
	reqParams: any,
	service: any,
	suc: any,
	fail: any
}