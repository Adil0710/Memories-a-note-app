import React from 'react'

function FeedbackForm() {
  return (
    <div>
        {/* Feedback Form Section */}
      <section className="py-12 bg-white dark:bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-4">We'd Love to Hear From You</h2>
        <div className="max-w-2xl mx-auto">
          <Form layout="vertical">
            <Form.Item label="Name" name="name">
              <Input placeholder="Your Name" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" placeholder="Your Email" />
            </Form.Item>
            <Form.Item label="Message" name="message">
              <Input.TextArea rows={4} placeholder="Your Message" />
            </Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form>
        </div>
      </section>
    </div>
  )
}

export default FeedbackForm