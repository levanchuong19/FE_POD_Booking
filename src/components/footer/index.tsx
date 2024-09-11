import { Button, Form, Input } from "antd"
import FormItem from "antd/es/form/FormItem"
import "./index.scss"
import { useForm } from "antd/es/form/Form"
import axios from "axios";

function Footer() {
    const [form] = useForm();
    // const handleSubmit = async (values) => {
    //       await axios.post("https://662b9b66de35f91de158d943.mockapi.io/podbooking", values);
    // }
  return (
    <div className="footer">
        <div className="footer__tren">
        <div className="footer__tren__left">
        <img width={150} height={70} src="https://workflow.com.vn/wp-content/themes/workflow/assets/img/logo_footer.png" alt="" />
        <div className="content_left">
        <h4>WorkFlow Space</h4>
        <p>39 Nguyễn Duy Hiệu, P. Thảo Điền, TP. Thủ Đức, TP.HCM</p>
        <p>+84 33 368 0099</p>
        <p>195/3 Hai Bà Trưng, Phường 6, Quận 3, TP.HCM</p>
        <p>+84 86 995 5573</p>
        <p>info@workflow.com.vn</p>
        
        
        <div className="icon">
            <img src="https://workflow.com.vn/wp-content/themes/workflow/assets/img/fb.png" alt="" />
            <img src="https://workflow.com.vn/wp-content/themes/workflow/assets/img/instagram.png" alt="" />
            <img src="https://workflow.com.vn/wp-content/themes/workflow/assets/img/in.png" alt="" />
        </div>
        </div>
        </div>

        <div className="footer__tren__reight">
            <h2>Để lại thông tin để được tư vấn và hỗ trợ trải nghiệm thực tế</h2>
            <Form form={form}>
                <FormItem className="form"  name={"name"} >
                    <p>Điền tên của bạn:</p>
                  <Input/>
                </FormItem>
                <FormItem className="form"  name={"phone"}>
                <p>Điền số điện thoại của bạn:</p>
                  <Input/>
                </FormItem>
                <Button className="gui">Gửi</Button>
            </Form>
        </div>
        </div>
        <div className="footer__line"></div>
        <div className="footer__content">
            <p>© 2024 Work Flow. All rights reserved.</p>
            <a href="/">Quyền riêng tư</a>
            <a href="/">Điều khoản sử dụng</a>
        </div>
    </div>
  )
}

export default Footer